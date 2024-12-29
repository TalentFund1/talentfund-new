import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useMemo } from "react";

const data = [
  {
    category: "Software Development",
    subcategory: "Programming Languages",
    skill: "Python",
    proficiency: 85,
    color: "#FFD699"
  },
  {
    category: "Software Development",
    subcategory: "Web Development",
    skill: "React",
    proficiency: 78,
    color: "#FFD699"
  },
  {
    category: "AI & Machine Learning",
    subcategory: "Deep Learning",
    skill: "Neural Networks",
    proficiency: 92,
    color: "#FF9999"
  },
  {
    category: "AI & Machine Learning",
    subcategory: "NLP",
    skill: "Text Processing",
    proficiency: 75,
    color: "#FF9999"
  },
  {
    category: "Design & UX",
    subcategory: "UI Design",
    skill: "Figma",
    proficiency: 88,
    color: "#99D6B9"
  },
  {
    category: "Design & UX",
    subcategory: "User Research",
    skill: "Usability Testing",
    proficiency: 82,
    color: "#99D6B9"
  }
];

export const SkillsOverview = () => {
  const [selectedView, setSelectedView] = useState<"category" | "subcategory" | "skill">("category");

  const chartData = useMemo(() => {
    console.log('Recalculating chart data for view:', selectedView);
    
    if (selectedView === "category") {
      return data.reduce((acc, curr) => {
        const existingCategory = acc.find(item => item.name === curr.category);
        if (existingCategory) {
          existingCategory.proficiency = (existingCategory.proficiency + curr.proficiency) / 2;
        } else {
          acc.push({ name: curr.category, proficiency: curr.proficiency });
        }
        return acc;
      }, [] as { name: string; proficiency: number }[]);
    }

    if (selectedView === "subcategory") {
      return data.reduce((acc, curr) => {
        const existingSubcategory = acc.find(item => item.name === curr.subcategory);
        if (existingSubcategory) {
          existingSubcategory.proficiency = (existingSubcategory.proficiency + curr.proficiency) / 2;
        } else {
          acc.push({ name: curr.subcategory, proficiency: curr.proficiency });
        }
        return acc;
      }, [] as { name: string; proficiency: number }[]);
    }

    return data.map(item => ({
      name: item.skill,
      proficiency: item.proficiency
    }));
  }, [selectedView]);

  return (
    <Card className="p-6 animate-fade-in border-border border bg-white">
      <h2 className="text-xl font-semibold text-foreground mb-2">Skills Distribution</h2>
      <p className="text-sm text-secondary-foreground mb-6">
        Here you can find an overview of skills in your organization, categorized into three levels. Check the Employee tab to explore further.
      </p>

      <Tabs defaultValue="category" className="w-full mb-6" onValueChange={(value) => setSelectedView(value as "category" | "subcategory" | "skill")}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="category">Category</TabsTrigger>
          <TabsTrigger value="subcategory">Subcategory</TabsTrigger>
          <TabsTrigger value="skill">Skill Title</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
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