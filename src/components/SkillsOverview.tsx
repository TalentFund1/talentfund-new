import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useToggledSkills } from "./skills/context/ToggledSkillsContext";
import { roleSkills } from "./skills/data/roleSkills";

const categorizeSkill = (skill: any) => {
  // Critical skills are those with high level and required status
  if (skill.level === 'advanced' && skill.requirement === 'required') {
    return "critical";
  }
  // Technical skills are those related to technical categories
  if (["AI & ML", "Programming Languages", "Backend Development", "Frontend Development", "Data Management", "Cloud & DevOps"].includes(skill.subcategory)) {
    return "technical";
  }
  // Necessary skills are the remaining skills
  return "necessary";
};

const countSkillUsage = (skillTitle: string) => {
  let count = 0;
  Object.values(roleSkills).forEach(role => {
    if (role.specialized.some(s => s.title === skillTitle)) count++;
    if (role.common.some(s => s.title === skillTitle)) count++;
    if (role.certifications.some(s => s.title === skillTitle)) count++;
  });
  return count;
};

const getSkillColor = (level: string) => {
  switch (level.toLowerCase()) {
    case 'advanced':
      return '#8073ec';
    case 'intermediate':
      return '#33C3F0';
    default:
      return '#FEC6A1';
  }
};

export const SkillsOverview = () => {
  const [selectedView, setSelectedView] = useState<"critical" | "technical" | "necessary">("critical");
  const { toggledSkills } = useToggledSkills();

  const getChartData = () => {
    // Get all toggled skills and their data
    const toggledSkillsData = Array.from(toggledSkills).map(skillTitle => {
      // Find the skill in roleSkills to get its details
      let skillDetails = { subcategory: "", level: "intermediate", requirement: "preferred" };
      Object.values(roleSkills).some(role => {
        const found = [...role.specialized, ...role.common, ...role.certifications]
          .find(s => s.title === skillTitle);
        if (found) {
          skillDetails = {
            subcategory: found.subcategory,
            level: found.level,
            requirement: found.requirement
          };
          return true;
        }
        return false;
      });

      return {
        skill: skillTitle,
        level: skillDetails.level,
        subcategory: skillDetails.subcategory,
        requirement: skillDetails.requirement,
        usageCount: countSkillUsage(skillTitle),
        type: categorizeSkill(skillDetails)
      };
    });

    // Filter by selected type and sort by usage count
    const filteredData = toggledSkillsData
      .filter(item => item.type === selectedView)
      .sort((a, b) => b.usageCount - a.usageCount);

    return filteredData.map(item => ({
      name: item.skill,
      value: item.level === 'advanced' ? 90 : item.level === 'intermediate' ? 60 : 30,
      usageCount: item.usageCount,
      level: item.level,
      subcategory: item.subcategory
    }));
  };

  const chartData = getChartData();

  return (
    <Card className="p-6 animate-fade-in border-border border bg-white">
      <h2 className="text-xl font-semibold text-foreground mb-2">Skills Distribution</h2>
      <p className="text-sm text-secondary-foreground mb-6">
        Here you can find an overview of skills in your organization, categorized into three levels. Check the Employee tab to explore further.
      </p>

      <Tabs defaultValue="critical" className="w-full mb-6" onValueChange={(value) => setSelectedView(value as "critical" | "technical" | "necessary")}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="critical">
            <div className="flex flex-col items-center">
              <span>Critical Skills</span>
              <span className="text-xs text-muted-foreground">({chartData.length})</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="technical">
            <div className="flex flex-col items-center">
              <span>Technical Skills</span>
              <span className="text-xs text-muted-foreground">({chartData.length})</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="necessary">
            <div className="flex flex-col items-center">
              <span>Necessary Skills</span>
              <span className="text-xs text-muted-foreground">({chartData.length})</span>
            </div>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
            <XAxis 
              dataKey="name" 
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              label={{ value: 'Proficiency Level (%)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-4 border border-border rounded shadow-sm space-y-2">
                      <p className="font-medium text-foreground">{data.name}</p>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Level:</span> {data.level}</p>
                        <p><span className="font-medium">Category:</span> {data.subcategory}</p>
                        <p><span className="font-medium">Usage Count:</span> {data.usageCount} roles</p>
                        <p><span className="font-medium">Proficiency:</span> {data.value}%</p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="value"
              fill="#8073ec"
              radius={[4, 4, 0, 0]}
              barSize={40}
              fillOpacity={0.8}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};