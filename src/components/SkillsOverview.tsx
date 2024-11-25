import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const categorizeSkill = (skill: any) => {
  // Critical skills are those with high proficiency
  if (skill.proficiency >= 85) {
    return "critical";
  }
  // Technical skills are those related to technical categories
  if (["Software Development", "AI & Machine Learning"].includes(skill.category)) {
    return "technical";
  }
  // Necessary skills are the remaining skills
  return "necessary";
};

const data = [
  {
    category: "Software Development",
    subcategory: "Programming Languages",
    skill: "Python",
    proficiency: 85,
    type: "critical"
  },
  {
    category: "Software Development",
    subcategory: "Web Development",
    skill: "React",
    proficiency: 78,
    type: "technical"
  },
  {
    category: "AI & Machine Learning",
    subcategory: "Deep Learning",
    skill: "Neural Networks",
    proficiency: 92,
    type: "critical"
  },
  {
    category: "AI & Machine Learning",
    subcategory: "NLP",
    skill: "Text Processing",
    proficiency: 75,
    type: "technical"
  },
  {
    category: "Design & UX",
    subcategory: "UI Design",
    skill: "Figma",
    proficiency: 88,
    type: "necessary"
  },
  {
    category: "Design & UX",
    subcategory: "User Research",
    skill: "Usability Testing",
    proficiency: 82,
    type: "necessary"
  }
].map(skill => ({
  ...skill,
  type: categorizeSkill(skill)
}));

export const SkillsOverview = () => {
  const [selectedView, setSelectedView] = useState<"critical" | "technical" | "necessary">("critical");

  const getChartData = () => {
    const filteredData = data.filter(item => item.type === selectedView);
    return filteredData.map(item => ({
      name: item.skill,
      proficiency: item.proficiency
    }));
  };

  return (
    <Card className="p-6 animate-fade-in border-border border bg-white">
      <h2 className="text-xl font-semibold text-foreground mb-2">Skills Distribution</h2>
      <p className="text-sm text-secondary-foreground mb-6">
        Here you can find an overview of skills in your organization, categorized into three levels. Check the Employee tab to explore further.
      </p>

      <Tabs defaultValue="critical" className="w-full mb-6" onValueChange={(value) => setSelectedView(value as "critical" | "technical" | "necessary")}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="critical">Critical Skills</TabsTrigger>
          <TabsTrigger value="technical">Technical Skills</TabsTrigger>
          <TabsTrigger value="necessary">Necessary Skills</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={getChartData()} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 border border-border rounded shadow-sm">
                      <p className="font-medium">{data.name}</p>
                      <p className="text-sm font-medium">Proficiency: {data.proficiency}%</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="proficiency"
              fill="#8073ec"
              radius={[4, 4, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};