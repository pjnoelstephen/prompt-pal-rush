import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Lightbulb, 
  Heart, 
  Zap, 
  Brain, 
  Music, 
  Coffee,
  Moon,
  Activity,
  BookOpen,
  Headphones
} from "lucide-react";

interface MoodEntry {
  date: string;
  mood: string;
  energy: number;
  stress: number;
  notes?: string;
}

interface WellnessRecommendationsProps {
  moodEntries: MoodEntry[];
  currentMood?: string;
  averageStress: number;
  averageEnergy: number;
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: "exercise" | "relaxation" | "social" | "productivity" | "mindfulness";
  icon: any;
  duration: string;
  color: string;
}

export const WellnessRecommendations = ({ 
  moodEntries, 
  currentMood, 
  averageStress, 
  averageEnergy 
}: WellnessRecommendationsProps) => {
  
  const generateRecommendations = (): Recommendation[] => {
    const recommendations: Recommendation[] = [];

    // Stress-based recommendations
    if (averageStress > 6) {
      recommendations.push({
        id: "breathing",
        title: "Deep Breathing Exercise",
        description: "Try a 5-minute breathing exercise to reduce stress and anxiety",
        type: "mindfulness",
        icon: Brain,
        duration: "5 min",
        color: "wellness-calm"
      });
      
      recommendations.push({
        id: "meditation",
        title: "Guided Meditation",
        description: "Listen to a calming meditation to center yourself",
        type: "relaxation",
        icon: Headphones,
        duration: "10 min",
        color: "wellness-calm"
      });
    }

    // Energy-based recommendations
    if (averageEnergy < 5) {
      recommendations.push({
        id: "walk",
        title: "Take a Walk",
        description: "A short walk outside can boost your energy and mood",
        type: "exercise",
        icon: Activity,
        duration: "15 min",
        color: "wellness-energy"
      });

      recommendations.push({
        id: "hydrate",
        title: "Stay Hydrated",
        description: "Drink a glass of water and have a healthy snack",
        type: "productivity",
        icon: Coffee,
        duration: "2 min",
        color: "wellness-energy"
      });
    } else if (averageEnergy > 7) {
      recommendations.push({
        id: "workout",
        title: "High-Energy Workout",
        description: "Channel your energy into a quick HIIT session",
        type: "exercise",
        icon: Zap,
        duration: "20 min",
        color: "wellness-energy"
      });
    }

    // Mood-specific recommendations
    if (currentMood === "sad" || currentMood === "anxious") {
      recommendations.push({
        id: "music",
        title: "Listen to Uplifting Music",
        description: "Put on your favorite playlist to lift your spirits",
        type: "relaxation",
        icon: Music,
        duration: "Variable",
        color: "wellness-happy"
      });

      recommendations.push({
        id: "journal",
        title: "Gratitude Journal",
        description: "Write down three things you're grateful for today",
        type: "mindfulness",
        icon: BookOpen,
        duration: "5 min",
        color: "wellness-happy"
      });
    }

    // General wellness recommendations
    if (recommendations.length < 4) {
      recommendations.push({
        id: "self-care",
        title: "Self-Care Moment",
        description: "Take a few minutes for yourself - read, stretch, or just breathe",
        type: "relaxation",
        icon: Heart,
        duration: "10 min",
        color: "primary"
      });

      if (new Date().getHours() > 18) {
        recommendations.push({
          id: "sleep",
          title: "Prepare for Sleep",
          description: "Start winding down with a calming evening routine",
          type: "relaxation",
          icon: Moon,
          duration: "30 min",
          color: "wellness-calm"
        });
      }
    }

    return recommendations.slice(0, 4);
  };

  const recommendations = generateRecommendations();

  const getTypeColor = (type: string) => {
    switch (type) {
      case "exercise": return "bg-wellness-energy/20 text-wellness-energy";
      case "relaxation": return "bg-wellness-calm/20 text-primary";
      case "mindfulness": return "bg-wellness-happy/20 text-wellness-happy";
      case "social": return "bg-accent/20 text-accent";
      case "productivity": return "bg-secondary/50 text-secondary-foreground";
      default: return "bg-muted/50 text-muted-foreground";
    }
  };

  return (
    <Card className="card-gradient border-0 shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          AI Wellness Recommendations
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Personalized suggestions based on your recent mood patterns
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {recommendations.length > 0 ? (
          <div className="space-y-3">
            {recommendations.map((rec) => {
              const Icon = rec.icon;
              return (
                <div
                  key={rec.id}
                  className="p-4 rounded-lg border bg-card/50 hover:bg-card transition-smooth group cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-bounce" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{rec.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className={getTypeColor(rec.type)}>
                            {rec.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {rec.duration}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {rec.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Complete your daily check-in to get personalized recommendations!</p>
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full">
              View All Wellness Resources
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};