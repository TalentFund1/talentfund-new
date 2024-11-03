import { Card } from "@/components/ui/card";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Python", x: 100, y: 200, z: 80, category: "Software Development", color: "#FFD699" },
  { name: "Software Development", x: 200, y: 200, z: 120, category: "Software Development", color: "#FFD699" },
  { name: "Artificial Intelligence", x: 300, y: 200, z: 90, category: "AI", color: "#FF9999" },
  { name: "Machine Learning", x: 400, y: 200, z: 100, category: "AI", color: "#FF9999" },
  { name: "Language Processing", x: 500, y: 200, z: 70, category: "AI", color: "#FF9999" },
  { name: "Design", x: 600, y: 200, z: 110, category: "Design", color: "#99D6B9" },
  { name: "Marketing", x: 700, y: 200, z: 85, category: "Marketing", color: "#99D6B9" },
];

export const SkillsOverview = () => {
  return (
    <Card className="p-6 animate-fade-in border-border border">
      <h2 className="text-xl font-semibold text-foreground mb-2">Skills Distribution</h2>
      <p className="text-sm text-secondary-foreground mb-6">
        Here you can find an overview of skills in your organization, categorized into three levels. Check the Employee tab to explore further.
      </p>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-sm font-medium">Category</div>
        <div className="text-sm font-medium">Subcategory</div>
        <div className="text-sm font-medium">Skill Title</div>
      </div>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <XAxis type="number" dataKey="x" hide domain={[0, 800]} />
            <YAxis type="number" dataKey="y" hide domain={[0, 400]} />
            <ZAxis type="number" dataKey="z" range={[50, 200]} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 border border-border rounded shadow-sm">
                      <p className="font-medium">{data.name}</p>
                      <p className="text-sm text-secondary-foreground">{data.category}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter
              data={data}
              fill="#8073ec"
              shape={(props) => {
                const { cx, cy, payload, r } = props;
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill={payload.color}
                    fillOpacity={0.6}
                  />
                );
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};