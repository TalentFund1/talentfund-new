import { TableCell, TableRow } from "@/components/ui/table";
import { Check } from "lucide-react";
import { SkillLevelIcon } from "../skills/SkillLevelIcon";
import { SimpleSkill } from "../skills/types/SkillTypes";
import { roleSkills } from "../skills/data/roleSkills";
import { useParams } from "react-router-dom";

interface SkillsTableRowProps {
  skill: SimpleSkill;
  isEven: boolean;
}

const getSkillScore = (level: string): number => {
  switch (level.toLowerCase()) {
    case 'advanced':
      return Math.floor(Math.random() * 26) + 75; // 75-100
    case 'intermediate':
      return Math.floor(Math.random() * 26) + 50; // 50-75
    case 'beginner':
      return Math.floor(Math.random() * 26) + 25; // 25-50
    default:
      return Math.floor(Math.random() * 26); // 0-25
  }
};

const getScoreColor = (score: number): string => {
  if (score >= 75) return 'bg-blue-50 text-blue-700';
  if (score >= 50) return 'bg-green-50 text-green-700';
  if (score >= 25) return 'bg-orange-50 text-orange-700';
  return 'bg-gray-50 text-gray-700';
};

export const SkillsTableRow = ({ skill, isEven }: SkillsTableRowProps) => {
  const { id } = useParams();
  const skillScore = getSkillScore(skill.level);
  
  const getSkillType = (skillTitle: string): string => {
    const currentRoleSkills = roleSkills[id as keyof typeof roleSkills] || roleSkills["123"];
    
    if (currentRoleSkills.specialized.some(s => s.title === skillTitle)) {
      return 'Specialized';
    }
    if (currentRoleSkills.common.some(s => s.title === skillTitle)) {
      return 'Common';
    }
    if (currentRoleSkills.certifications.some(s => s.title === skillTitle)) {
      return 'Certification';
    }
    return 'Uncategorized';
  };

  const getLevelBackgroundColor = (level: string) => {
    switch (level) {
      case "Advanced":
        return "bg-primary-accent/5";
      case "Intermediate":
        return "bg-primary-icon/5";
      case "Beginner":
        return "bg-[#008000]/5";
      default:
        return "bg-[#F7F9FF]";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Specialized":
        return "bg-blue-100 text-blue-800";
      case "Common":
        return "bg-green-100 text-green-800";
      case "Certification":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const skillType = getSkillType(skill.title);

  return (
    <TableRow className={`group transition-all duration-200 hover:bg-muted/50 ${isEven ? 'bg-muted/5' : ''}`}>
      <TableCell className="font-medium border-x border-blue-200/60 group-hover:bg-transparent py-4">
        {skill.title}
      </TableCell>
      <TableCell className="border-r border-blue-200/60 group-hover:bg-transparent py-4 text-muted-foreground">
        {skill.subcategory}
      </TableCell>
      <TableCell className="border-r border-blue-200/60 group-hover:bg-transparent py-4 text-muted-foreground">
        {skill.businessCategory || 'Information Technology'}
      </TableCell>
      <TableCell className="border-r border-blue-200/60 group-hover:bg-transparent py-4">
        <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-sm font-medium ${getTypeColor(skillType)}`}>
          {skillType}
        </span>
      </TableCell>
      <TableCell className={`text-center border-r border-blue-200/60 group-hover:bg-transparent py-4 w-[100px] ${getLevelBackgroundColor("Advanced")}`}>
        {skill.level === "Advanced" && <SkillLevelIcon level="advanced" />}
      </TableCell>
      <TableCell className={`text-center border-r border-blue-200/60 group-hover:bg-transparent py-4 w-[100px] ${getLevelBackgroundColor("Intermediate")}`}>
        {skill.level === "Intermediate" && <SkillLevelIcon level="intermediate" />}
      </TableCell>
      <TableCell className={`text-center border-r border-blue-200/60 group-hover:bg-transparent py-4 w-[100px] ${getLevelBackgroundColor("Beginner")}`}>
        {skill.level === "Beginner" && <SkillLevelIcon level="beginner" />}
      </TableCell>
      <TableCell className="text-center border-r border-blue-200/60 group-hover:bg-transparent py-4">
        <span className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full text-sm ${getScoreColor(skillScore)}`}>
          {skillScore}
        </span>
      </TableCell>
      <TableCell className="text-center border-r border-blue-200/60 group-hover:bg-transparent py-4">
        <span className={`inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
          skill.growth === "0%" ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
        }`}>
          ↗ {skill.growth}
        </span>
      </TableCell>
    </TableRow>
  );
};