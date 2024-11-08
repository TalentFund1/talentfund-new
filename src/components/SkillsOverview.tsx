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

const categoryCards = [
  { id: "all", name: "All Categories", count: 28 },
  { id: "specialized", name: "Specialized Skills", count: 15 },
  { id: "common", name: "Common Skills", count: 10 },
  { id: "certification", name: "Certification", count: 3 }
];

export const SkillsOverview = () => {
  const [selectedView, setSelectedView] = useState<"category" | "subcategory" | "skill">("category");
  const [selectedCategory, setSelectedCategory] = useState("all");

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
    <div className="space-y-6 animate-fade-in">
      {/* Category Cards */}
      <div className="grid grid-cols-4 gap-4">
        {categoryCards.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`rounded-lg p-4 transition-colors ${
              selectedCategory === category.id
                ? 'bg-primary-accent/5 border border-primary-accent'
                : 'bg-background border border-border hover:border-primary-accent/50'
            }`}
          >
            <div className="flex flex-col items-start">
              <span className={`text-sm font-semibold mb-1 ${
                selectedCategory === category.id
                  ? 'text-primary-accent'
                  : 'text-foreground group-hover:text-primary-accent'
              }`}>
                {category.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {category.count} skills
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Skills Distribution Card */}
      <Card className="p-6 border-border border bg-white">
        <h2 className="text-xl font-semibold text-foreground mb-2">Skills Distribution</h2>
        <p className="text-sm text-secondary-foreground mb-6">
          Here you can find an overview of skills in your organization, categorized into three levels. Check the Employee tab to explore further.
        </p>

        <Tabs 
          defaultValue="category" 
          className="w-full mb-6" 
          onValueChange={(value) => setSelectedView(value as "category" | "subcategory" | "skill")}
        >
          <TabsList className="grid w-full grid-cols-3 h-11 items-center bg-background p-1 rounded-md">
            <TabsTrigger 
              value="category"
              className="data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Category
            </TabsTrigger>
            <TabsTrigger 
              value="subcategory"
              className="data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Subcategory
            </TabsTrigger>
            <TabsTrigger 
              value="skill"
              className="data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              Skill Title
            </TabsTrigger>
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
    </div>
  );
};