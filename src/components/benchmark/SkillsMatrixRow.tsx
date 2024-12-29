import { TableCell, TableRow } from "@/components/ui/table";
import { roleSkills } from "../skills/data/roleSkills";
import { useParams } from "react-router-dom";
import { SimpleSkill } from "../skills/types/SkillTypes";

interface SkillsTableRowProps {
  skill: SimpleSkill;
  isEven: boolean;
}

export const SkillsTableRow = ({ skill, isEven }: SkillsTableRowProps) => {
  const { id } = useParams();
  
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

  const getScoreColor = (score: number): string => {
    if (score >= 75) return 'bg-[#8073ec]/10 text-[#8073ec]';
    if (score >= 50) return 'bg-[#ff8256]/10 text-[#ff8256]';
    if (score >= 25) return 'bg-[#008000]/10 text-[#008000]';
    return 'bg-[#8E9196]/10 text-[#8E9196]';
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
      <TableCell className="text-center border-r border-blue-200/60 group-hover:bg-transparent py-4">
        <span className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full text-sm ${getScoreColor(skill.skillScore)}`}>
          {skill.skillScore}
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

export { SkillsTableRow as SkillsMatrixRow };