import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToggledSkills } from "./skills/context/ToggledSkillsContext";
import { roleSkills } from "./skills/data/roleSkills";

const getSkillUsageCount = (skillTitle: string) => {
  // Count how many role profiles use this skill
  return Object.values(roleSkills).reduce((count, role) => {
    const hasSkill = [...role.specialized, ...role.common, ...role.certifications]
      .some(skill => skill.title === skillTitle);
    return count + (hasSkill ? 1 : 0);
  }, 0);
};

const categorizeSkill = (skill: any) => {
  if (skill.growth >= "25%" && skill.requirement === "required") {
    return "Critical Skills";
  }
  if (["AI & ML", "Programming Languages", "ML Frameworks", "AI Applications"].includes(skill.subcategory)) {
    return "Technical Skills";
  }
  return "Necessary Skills";
};

export const SkillsOverview = () => {
  const [selectedView, setSelectedView] = useState<"category" | "subcategory" | "skill">("category");
  const { toggledSkills } = useToggledSkills();

  const getSkillData = () => {
    const allSkills = Object.values(roleSkills).flatMap(role => [
      ...role.specialized,
      ...role.common,
      ...role.certifications
    ]);

    // Filter only toggled skills and add usage count
    const toggledSkillsData = Array.from(toggledSkills)
      .map(skillTitle => {
        const skillInfo = allSkills.find(s => s.title === skillTitle);
        if (!skillInfo) return null;
        
        return {
          ...skillInfo,
          usageCount: getSkillUsageCount(skillTitle),
          category: categorizeSkill(skillInfo)
        };
      })
      .filter(Boolean);

    // Sort by usage count
    toggledSkillsData.sort((a, b) => b.usageCount - a.usageCount);

    if (selectedView === "category") {
      const categoryData = toggledSkillsData.reduce((acc, curr) => {
        const existingCategory = acc.find(item => item.name === curr.category);
        if (existingCategory) {
          existingCategory.proficiency = Math.max(existingCategory.proficiency, curr.usageCount * 20);
        } else {
          acc.push({ 
            name: curr.category, 
            proficiency: curr.usageCount * 20,
            color: curr.category === "Critical Skills" ? "#FF9999" : 
                   curr.category === "Technical Skills" ? "#FFD699" : "#99D6B9"
          });
        }
        return acc;
      }, [] as { name: string; proficiency: number; color: string }[]);
      return categoryData;
    }

    if (selectedView === "subcategory") {
      const subcategoryData = toggledSkillsData.reduce((acc, curr) => {
        const existingSubcategory = acc.find(item => item.name === curr.subcategory);
        if (existingSubcategory) {
          existingSubcategory.proficiency = Math.max(existingSubcategory.proficiency, curr.usageCount * 20);
        } else {
          acc.push({ 
            name: curr.subcategory, 
            proficiency: curr.usageCount * 20,
            color: "#8073ec"
          });
        }
        return acc;
      }, [] as { name: string; proficiency: number; color: string }[]);
      return subcategoryData;
    }

    return toggledSkillsData.map(skill => ({
      name: skill.title,
      proficiency: skill.usageCount * 20,
      color: "#8073ec"
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
          <BarChart data={getSkillData()} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
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
                      <p className="text-sm font-medium">Usage Score: {data.proficiency}%</p>
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