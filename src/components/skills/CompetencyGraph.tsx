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

const getLevelStyles = (level: string) => {
  switch (level.toLowerCase()) {
    case 'advanced':
      return 'text-purple-700 font-medium bg-purple-50 px-2 py-1 rounded-full';
    case 'intermediate':
      return 'text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded-full';
    case 'beginner':
      return 'text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full';
    default:
      return '';
  }
};

const getRequirementStyles = (requirement: string) => {
  switch (requirement.toLowerCase()) {
    case 'required':
      return 'text-gray-700 bg-gray-100 text-xs px-2 py-0.5 rounded-full font-medium';
    case 'preferred':
      return 'text-blue-700 bg-blue-50 text-xs px-2 py-0.5 rounded-full font-medium';
    default:
      return '';
  }
};

export const CompetencyGraph = () => {
  const [track, setTrack] = useState<"Professional" | "Managerial">("Professional");
  
  const skills = track === "Professional" ? professionalSkills : managerialSkills;
  const levels = track === "Professional" ? ["P1", "P2", "P3", "P4", "P5", "P6"] : ["M3", "M4", "M5", "M6"];

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
            <TableRow className="bg-gray-50">
              <TableHead className="w-[200px] font-semibold">Skill</TableHead>
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
              <TableRow key={skillName} className="hover:bg-gray-50/50">
                <TableCell className="font-medium">{skillName}</TableCell>
                {levels.map((level) => {
                  const details = getSkillDetails(skillName, level);
                  return (
                    <TableCell key={level} className="text-center">
                      {details.level !== "-" ? (
                        <div className="space-y-1.5">
                          <div className={getLevelStyles(details.level)}>
                            {details.level}
                          </div>
                          <div className={getRequirementStyles(details.required)}>
                            {details.required}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
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
