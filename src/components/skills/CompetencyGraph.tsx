import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

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
  ],
};

export const CompetencyGraph = () => {
  const [track, setTrack] = useState<"Professional" | "Managerial">("Professional");
  
  const skills = track === "Professional" ? professionalSkills : managerialSkills;
  const levels = track === "Professional" ? ["P1", "P2", "P3"] : ["M3", "M4"];

  // Get unique skill names
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
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Track:</span>
        <Select value={track} onValueChange={(value) => setTrack(value as "Professional" | "Managerial")}>
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Professional">Professional</SelectItem>
            <SelectItem value="Managerial">Managerial</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Skill</TableHead>
              {levels.map((level) => (
                <TableHead key={level} className="text-center">
                  <div className="font-semibold">{level}</div>
                  <div className="text-xs text-muted-foreground mt-1">Level / Required</div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {uniqueSkills.map((skillName) => (
              <TableRow key={skillName}>
                <TableCell className="font-medium">{skillName}</TableCell>
                {levels.map((level) => {
                  const details = getSkillDetails(skillName, level);
                  return (
                    <TableCell key={level} className="text-center">
                      <div className="space-y-1">
                        <div className={`text-sm capitalize ${
                          details.level === "advanced" 
                            ? "text-primary-accent" 
                            : details.level === "intermediate"
                            ? "text-primary-icon"
                            : "text-[#008000]"
                        }`}>
                          {details.level}
                        </div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {details.required}
                        </div>
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};