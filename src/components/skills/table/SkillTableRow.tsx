import { TableCell, TableRow } from "@/components/ui/table";
import { UnifiedSkill } from "../types/SkillTypes";
import { SkillLevelIcon } from "./SkillLevelIcon";

interface SkillTableRowProps {
  skill: UnifiedSkill;
  onGrowthClick: () => void;
}

export const SkillTableRow = ({ skill, onGrowthClick }: SkillTableRowProps) => {
  return (
    <TableRow className="hover:bg-muted/50 transition-colors">
      <TableCell className="font-medium">{skill.title}</TableCell>
      <TableCell>{skill.subcategory}</TableCell>
      <TableCell>{skill.category}</TableCell>
      <TableCell>
        <span className="flex items-center gap-2">
          {skill.level && <SkillLevelIcon level={skill.level as any} />}
          {skill.level}
        </span>
      </TableCell>
      <TableCell>
        <span 
          className="cursor-pointer text-primary hover:text-primary-accent transition-colors"
          onClick={onGrowthClick}
        >
          {skill.growth}
        </span>
      </TableCell>
    </TableRow>
  );
};