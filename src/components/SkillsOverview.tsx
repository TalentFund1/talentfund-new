import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { skill: "Leadership", value: 85 },
  { skill: "Communication", value: 92 },
  { skill: "Problem Solving", value: 78 },
  { skill: "Technical", value: 88 },
  { skill: "Innovation", value: 72 },
];

export const SkillsOverview = () => {
  return (
    <Card className="p-6 animate-fade-in">
      <h2 className="text-xl font-semibold text-primary mb-6">Skills Distribution</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="skill" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2C74B3" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};