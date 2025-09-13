import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { X, Send } from "lucide-react";

interface MoodCheckInProps {
  onSubmit: (data: {
    mood: string;
    energy: number;
    stress: number;
    notes?: string;
  }) => void;
  onClose: () => void;
}

const moodOptions = [
  { id: "happy", emoji: "😊", label: "Happy", color: "wellness-happy" },
  { id: "calm", emoji: "😌", label: "Calm", color: "wellness-calm" },
  { id: "energetic", emoji: "⚡", label: "Energetic", color: "wellness-energy" },
  { id: "anxious", emoji: "😰", label: "Anxious", color: "wellness-stress" },
  { id: "sad", emoji: "😔", label: "Sad", color: "wellness-sad" },
  { id: "tired", emoji: "😴", label: "Tired", color: "muted" },
  { id: "stressed", emoji: "😓", label: "Stressed", color: "wellness-stress" },
  { id: "neutral", emoji: "😐", label: "Neutral", color: "secondary" },
];

export const MoodCheckIn = ({ onSubmit, onClose }: MoodCheckInProps) => {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [energy, setEnergy] = useState<number[]>([5]);
  const [stress, setStress] = useState<number[]>([5]);
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!selectedMood) return;
    
    onSubmit({
      mood: selectedMood,
      energy: energy[0],
      stress: stress[0],
      notes: notes.trim() || undefined,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md card-gradient border-0 shadow-wellness animate-in slide-in-from-bottom-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">Daily Check-in</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            How are you feeling today? Your input helps us provide better recommendations.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Mood Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">How are you feeling?</Label>
            <div className="grid grid-cols-4 gap-2">
              {moodOptions.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`
                    p-3 rounded-xl border-2 transition-all duration-200 
                    hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary
                    ${selectedMood === mood.id 
                      ? 'border-primary bg-primary/10 shadow-soft' 
                      : 'border-border hover:border-primary/50'
                    }
                  `}
                >
                  <div className="text-2xl mb-1">{mood.emoji}</div>
                  <div className="text-xs font-medium">{mood.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Energy Level */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Energy Level</Label>
              <Badge variant="secondary" className="bg-wellness-energy/20 text-wellness-energy">
                {energy[0]}/10
              </Badge>
            </div>
            <Slider
              value={energy}
              onValueChange={setEnergy}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low Energy</span>
              <span>High Energy</span>
            </div>
          </div>

          {/* Stress Level */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Stress Level</Label>
              <Badge variant="secondary" className="bg-wellness-stress/20 text-wellness-stress">
                {stress[0]}/10
              </Badge>
            </div>
            <Slider
              value={stress}
              onValueChange={setStress}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>No Stress</span>
              <span>High Stress</span>
            </div>
          </div>

          {/* Optional Notes */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Notes (Optional)</Label>
            <Textarea
              placeholder="Anything specific you'd like to share about your day?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!selectedMood}
            className="w-full wellness-gradient text-white hover:scale-105 transition-bounce shadow-soft disabled:opacity-50 disabled:cursor-not-allowed"
            size="lg"
          >
            <Send className="mr-2 h-4 w-4" />
            Submit Check-in
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};