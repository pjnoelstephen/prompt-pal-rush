import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MoodCheckIn } from "./MoodCheckIn";
import { WellnessRecommendations } from "./WellnessRecommendations";
import { TrendChart } from "./TrendChart";
import { 
  Heart, 
  Brain, 
  Smile, 
  TrendingUp, 
  Calendar,
  Target,
  Activity
} from "lucide-react";

interface MoodEntry {
  date: string;
  mood: string;
  energy: number;
  stress: number;
  notes?: string;
}

export const WellnessDashboard = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([
    { date: "2025-09-10", mood: "happy", energy: 8, stress: 3 },
    { date: "2025-09-11", mood: "calm", energy: 7, stress: 2 },
    { date: "2025-09-12", mood: "energetic", energy: 9, stress: 4 },
  ]);

  const [showCheckIn, setShowCheckIn] = useState(false);

  const handleMoodSubmit = (moodData: Omit<MoodEntry, "date">) => {
    const newEntry: MoodEntry = {
      ...moodData,
      date: new Date().toISOString().split("T")[0],
    };
    setMoodEntries([...moodEntries, newEntry]);
    setShowCheckIn(false);
  };

  const todayEntry = moodEntries.find(
    entry => entry.date === new Date().toISOString().split("T")[0]
  );

  const averageEnergy = moodEntries.length > 0 
    ? Math.round(moodEntries.reduce((sum, entry) => sum + entry.energy, 0) / moodEntries.length)
    : 0;

  const averageStress = moodEntries.length > 0
    ? Math.round(moodEntries.reduce((sum, entry) => sum + entry.stress, 0) / moodEntries.length)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-wellness-calm to-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-primary animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Wellness Dashboard
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Track your mental wellness journey with AI-powered insights and personalized recommendations
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!todayEntry ? (
            <Button 
              onClick={() => setShowCheckIn(true)}
              size="lg"
              className="wellness-gradient text-white hover:scale-105 transition-bounce shadow-wellness"
            >
              <Smile className="mr-2 h-5 w-5" />
              Daily Check-in
            </Button>
          ) : (
            <Badge variant="secondary" className="p-3 text-sm">
              <Calendar className="mr-2 h-4 w-4" />
              Today's check-in completed
            </Badge>
          )}
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-gradient border-0 shadow-soft transition-smooth hover:shadow-wellness">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Energy Level</CardTitle>
              <Activity className="h-4 w-4 text-wellness-energy" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-wellness-energy">{averageEnergy}/10</div>
              <Progress value={averageEnergy * 10} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                7-day average
              </p>
            </CardContent>
          </Card>

          <Card className="card-gradient border-0 shadow-soft transition-smooth hover:shadow-wellness">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stress Level</CardTitle>
              <Brain className="h-4 w-4 text-wellness-stress" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-wellness-stress">{averageStress}/10</div>
              <Progress value={averageStress * 10} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Lower is better
              </p>
            </CardContent>
          </Card>

          <Card className="card-gradient border-0 shadow-soft transition-smooth hover:shadow-wellness">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wellness Score</CardTitle>
              <Target className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {Math.max(0, Math.round((averageEnergy * 10 - averageStress * 5) / 1.5))}%
              </div>
              <Progress value={Math.max(0, (averageEnergy * 10 - averageStress * 5) / 1.5)} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Overall wellness
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mood Trends */}
          <Card className="card-gradient border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Wellness Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TrendChart entries={moodEntries} />
            </CardContent>
          </Card>

          {/* Personalized Recommendations */}
          <WellnessRecommendations 
            moodEntries={moodEntries}
            currentMood={todayEntry?.mood}
            averageStress={averageStress}
            averageEnergy={averageEnergy}
          />
        </div>

        {/* Mood Check-in Modal */}
        {showCheckIn && (
          <MoodCheckIn
            onSubmit={handleMoodSubmit}
            onClose={() => setShowCheckIn(false)}
          />
        )}
      </div>
    </div>
  );
};