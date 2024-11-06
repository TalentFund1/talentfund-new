import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

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

  const getChartData = () => {
    if (selectedView === "category") {
      const categoryData = data.reduce((acc, curr) => {
        const existingCategory = acc.find(item => item.name === curr.category);
        if (existingCategory) {
          existingCategory.proficiency = (existingCategory.proficiency + curr.proficiency) / 2;
        } else {
          acc.push({ name: curr.category, proficiency: curr.proficiency });
        }
        return acc;
      }, [] as { name: string; proficiency: number }[]);
      return categoryData;
    }

    if (selectedView === "subcategory") {
      const subcategoryData = data.reduce((acc, curr) => {
        const existingSubcategory = acc.find(item => item.name === curr.subcategory);
        if (existingSubcategory) {
          existingSubcategory.proficiency = (existingSubcategory.proficiency + curr.proficiency) / 2;
        } else {
          acc.push({ name: curr.subcategory, proficiency: curr.proficiency });
        }
        return acc;
      }, [] as { name: string; proficiency: number }[]);
      return subcategoryData;
    }

    return data.map(item => ({
      name: item.skill,
      proficiency: item.proficiency
    }));
  };

  return (
    <Card className="p-8 animate-fade-in border-border border bg-white shadow-sm hover:shadow-md transition-all">
      <div className="space-y-4 mb-8">
        <h2 className="text-2xl font-semibold text-foreground tracking-tight">Skills Distribution</h2>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Here you can find an overview of skills in your organization, categorized into three levels. 
          Check the Employee tab to explore further.
        </p>
      </div>

      <Tabs 
        defaultValue="category" 
        className="w-full mb-8" 
        onValueChange={(value) => setSelectedView(value as "category" | "subcategory" | "skill")}
      >
        <TabsList className="grid w-full grid-cols-3 bg-muted/20">
          <TabsTrigger 
            value="category"
            className="data-[state=active]:bg-white data-[state=active]:text-primary-accent data-[state=active]:shadow-sm"
          >
            Category
          </TabsTrigger>
          <TabsTrigger 
            value="subcategory"
            className="data-[state=active]:bg-white data-[state=active]:text-primary-accent data-[state=active]:shadow-sm"
          >
            Subcategory
          </TabsTrigger>
          <TabsTrigger 
            value="skill"
            className="data-[state=active]:bg-white data-[state=active]:text-primary-accent data-[state=active]:shadow-sm"
          >
            Skill Title
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="h-[400px] bg-background/40 p-4 rounded-lg">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={getChartData()} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#1F2144', fontSize: 12 }}
              tickLine={{ stroke: '#CCDBFF' }}
            />
            <YAxis 
              tick={{ fill: '#1F2144', fontSize: 12 }}
              tickLine={{ stroke: '#CCDBFF' }}
              axisLine={{ stroke: '#CCDBFF' }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-4 border border-border rounded-lg shadow-lg">
                      <p className="font-medium text-foreground mb-2">{data.name}</p>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary-accent" />
                        <p className="text-sm font-medium">
                          Proficiency: {data.proficiency}%
                        </p>
                      </div>
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
              className="hover:opacity-80 transition-opacity"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};