import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { SkillCell } from "./competency/SkillCell";

type Skill = {
  name: string;
  level: string;
  required: string;
};

type SkillLevels = {
  [key: string]: Skill[];
};

const professionalSkills: SkillLevels = {
  "P1": [
    { name: "Amazon Web Services", level: "beginner", required: "required" },
    { name: "Python", level: "intermediate", required: "required" },
    { name: "Machine Learning", level: "beginner", required: "preferred" },
  ],
  "P2": [
    { name: "Amazon Web Services", level: "intermediate", required: "required" },
    { name: "Python", level: "intermediate", required: "required" },
    { name: "Machine Learning", level: "intermediate", required: "required" },
  ],
  "P3": [
    { name: "Amazon Web Services", level: "advanced", required: "required" },
    { name: "Python", level: "advanced", required: "required" },
    { name: "Machine Learning", level: "advanced", required: "required" },
  ],
  "P4": [
    { name: "Amazon Web Services", level: "advanced", required: "required" },
    { name: "Python", level: "advanced", required: "required" },
    { name: "Machine Learning", level: "advanced", required: "required" },
    { name: "System Design", level: "advanced", required: "required" },
  ],
  "P5": [
    { name: "Amazon Web Services", level: "advanced", required: "required" },
    { name: "Python", level: "advanced", required: "required" },
    { name: "Machine Learning", level: "advanced", required: "required" },
    { name: "System Design", level: "advanced", required: "required" },
    { name: "Technical Leadership", level: "intermediate", required: "required" },
  ],
  "P6": [
    { name: "Amazon Web Services", level: "advanced", required: "required" },
    { name: "Python", level: "advanced", required: "required" },
    { name: "Machine Learning", level: "advanced", required: "required" },
    { name: "System Design", level: "advanced", required: "required" },
    { name: "Technical Leadership", level: "advanced", required: "required" },
    { name: "Strategic Planning", level: "advanced", required: "required" },
  ],
};

const managerialSkills: SkillLevels = {
  "M3": [
    { name: "Team Leadership", level: "intermediate", required: "required" },
    { name: "Project Management", level: "intermediate", required: "required" },
    { name: "Technical Architecture", level: "intermediate", required: "preferred" },
  ],
  "M4": [
    { name: "Team Leadership", level: "advanced", required: "required" },
    { name: "Project Management", level: "advanced", required: "required" },
    { name: "Technical Architecture", level: "advanced", required: "required" },
    { name: "Strategic Planning", level: "intermediate", required: "required" },
  ],
  "M5": [
    { name: "Team Leadership", level: "advanced", required: "required" },
    { name: "Project Management", level: "advanced", required: "required" },
    { name: "Technical Architecture", level: "advanced", required: "required" },
    { name: "Strategic Planning", level: "advanced", required: "required" },
    { name: "Organizational Development", level: "intermediate", required: "required" },
  ],
  "M6": [
    { name: "Team Leadership", level: "advanced", required: "required" },
    { name: "Project Management", level: "advanced", required: "required" },
    { name: "Technical Architecture", level: "advanced", required: "required" },
    { name: "Strategic Planning", level: "advanced", required: "required" },
    { name: "Organizational Development", level: "advanced", required: "required" },
    { name: "Business Strategy", level: "advanced", required: "required" },
  ],
};

interface CompetencyGraphProps {
  track: "Professional" | "Managerial";
}

export const CompetencyGraph = ({ track }: CompetencyGraphProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const skills = track === "Professional" ? professionalSkills : managerialSkills;
  const levels = track === "Professional" ? ["P1", "P2", "P3", "P4", "P5", "P6"] : ["M3", "M4", "M5", "M6"];

  const skillCategories = [
    { id: "all", name: "All Skills", count: 28 },
    { id: "specialized", name: "Specialized Skills", count: 15 },
    { id: "common", name: "Common Skills", count: 10 },
    { id: "certification", name: "Certification", count: 3 }
  ];

  const uniqueSkills = Array.from(
    new Set(
      Object.values(skills)
        .flat()
        .map((skill) => skill.name)
    )
  );

  const getSkillDetails = (skillName: string, level: string) => {
    const skillLevel = skills[level];
    return skillLevel?.find((s) => s.name === skillName) || { level: "-", required: "-" };
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Skill Graph</h2>
        <Separator className="my-4" />
      </div>
      
      <div className="grid grid-cols-4 gap-4 mb-6">
        {skillCategories.map((category) => (
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

      <div className="rounded-lg border border-border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[200px] font-semibold bg-background/80 border-r border-border">Skill</TableHead>
              {levels.map((level, index) => (
                <TableHead 
                  key={level} 
                  className={`text-center bg-background/80 ${index !== levels.length - 1 ? 'border-r' : ''} border-border`}
                >
                  <div className="font-semibold">{level}</div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {uniqueSkills.map((skillName) => (
              <TableRow key={skillName} className="hover:bg-background/30 transition-colors">
                <TableCell className="font-medium border-r border-border">{skillName}</TableCell>
                {levels.map((level, index) => (
                  <SkillCell 
                    key={level}
                    details={getSkillDetails(skillName, level)}
                    isLastColumn={index === levels.length - 1}
                  />
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
