import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronUp, HelpCircle } from "lucide-react";
import { SkillCell } from "./SkillCell";
import { roleSkills } from "../data/roleSkills";

interface CompetencyTableProps {
  levels: string[];
  sortedSkills: string[];
  currentRoleId: string;
}

export const CompetencyTable = ({ levels, sortedSkills, currentRoleId }: CompetencyTableProps) => {
  const getSkillDetails = (skillName: string) => {
    const currentRoleSkills = roleSkills[currentRoleId as keyof typeof roleSkills] || roleSkills["123"];
    const allSkills = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ];
    
    const skill = allSkills.find(s => s.title === skillName);
    if (!skill) return { level: "-", required: "-" };
    
    return {
      level: skill.level || "-",
      required: "required"
    };
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-[200px] font-semibold bg-background/80 border-r border-border">
            Skill
          </TableHead>
          {levels.map((level, index) => (
            <TableHead 
              key={level} 
              className={`text-center bg-background/80 ${index !== levels.length - 1 ? 'border-r' : ''} border-border`}
            >
              <div className="font-semibold">{level.toUpperCase()}</div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedSkills.map((skillName) => (
          <TableRow key={skillName} className="hover:bg-background/30 transition-colors">
            <TableCell className="font-medium border-r border-border">
              {skillName}
            </TableCell>
            {levels.map((level, index) => (
              <SkillCell 
                key={level}
                skillName={skillName}
                details={getSkillDetails(skillName)}
                isLastColumn={index === levels.length - 1}
                levelKey={level}
              />
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};