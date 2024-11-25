import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToggledSkills } from "./skills/context/ToggledSkillsContext";
import { countSkillUsage, SkillUsage } from "./skills/utils/skillDistributionUtils";

export const SkillsOverview = () => {
  const [selectedView, setSelectedView] = useState<"category" | "subcategory" | "skill">("category");
  const { toggledSkills } = useToggledSkills();

  const getChartData = () => {
    const skillsData = countSkillUsage(toggledSkills);
    
    if (selectedView === "category") {
      const categoryData = skillsData.reduce((acc, curr) => {
        const existingCategory = acc.find(item => item.name === curr.category);
        if (existingCategory) {
          existingCategory.proficiency = Math.round((existingCategory.proficiency + curr.proficiency) / 2);
          existingCategory.count += 1;
        } else {
          acc.push({ 
            name: curr.category, 
            proficiency: curr.proficiency,
            count: 1 
          });
        }
        return acc;
      }, [] as { name: string; proficiency: number; count: number }[]);
      
      return categoryData.sort((a, b) => b.count - a.count);
    }

    if (selectedView === "subcategory") {
      const subcategoryData = skillsData.reduce((acc, curr) => {
        const existingSubcategory = acc.find(item => item.name === curr.subcategory);
        if (existingSubcategory) {
          existingSubcategory.proficiency = Math.round((existingSubcategory.proficiency + curr.proficiency) / 2);
          existingSubcategory.count += 1;
        } else {
          acc.push({ 
            name: curr.subcategory, 
            proficiency: curr.proficiency,
            count: 1 
          });
        }
        return acc;
      }, [] as { name: string; proficiency: number; count: number }[]);
      
      return subcategoryData.sort((a, b) => b.count - a.count);
    }

    return skillsData.map(item => ({
      name: item.name,
      proficiency: item.proficiency,
      count: item.usageCount
    }));
  };

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
          <BarChart data={getChartData()} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 border border-border rounded shadow-sm">
                      <p className="font-medium">{data.name}</p>
                      <p className="text-sm font-medium">Proficiency: {data.proficiency}%</p>
                      <p className="text-sm font-medium">Usage Count: {data.count}</p>
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