import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface MoodEntry {
  date: string;
  mood: string;
  energy: number;
  stress: number;
  notes?: string;
}

interface TrendChartProps {
  entries: MoodEntry[];
}

export const TrendChart = ({ entries }: TrendChartProps) => {
  const chartData = entries.map(entry => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }),
    energy: entry.energy,
    stress: entry.stress,
    wellness: Math.max(0, Math.round((entry.energy * 10 - entry.stress * 5) / 1.5))
  }));

  if (entries.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <p>No data yet. Start tracking your mood to see trends!</p>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur-sm border rounded-lg p-3 shadow-wellness">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'energy' && '⚡ '}
              {entry.dataKey === 'stress' && '🧠 '}
              {entry.dataKey === 'wellness' && '🎯 '}
              {entry.name}: {entry.value}
              {entry.dataKey === 'wellness' ? '%' : '/10'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            className="text-muted-foreground"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            className="text-muted-foreground"
            domain={[0, 100]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="energy"
            stroke="hsl(var(--wellness-energy))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--wellness-energy))", strokeWidth: 2, r: 4 }}
            name="Energy Level"
            activeDot={{ r: 6, fill: "hsl(var(--wellness-energy))" }}
          />
          <Line
            type="monotone"
            dataKey="stress"
            stroke="hsl(var(--wellness-stress))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--wellness-stress))", strokeWidth: 2, r: 4 }}
            name="Stress Level"
            activeDot={{ r: 6, fill: "hsl(var(--wellness-stress))" }}
          />
          <Line
            type="monotone"
            dataKey="wellness"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
            name="Wellness Score"
            activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};