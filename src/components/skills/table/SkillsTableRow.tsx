import { TableCell, TableRow } from "@/components/ui/table";
import { SkillLevelIcon } from "./SkillLevelIcon";
import { UnifiedSkill } from "../types/SkillTypes";

interface SkillTableRowProps {
  skill: UnifiedSkill;
  onGrowthClick: (skill: { title: string; growth: string }) => void;
}

export const SkillTableRow = ({ skill, onGrowthClick }: SkillTableRowProps) => {
  const truncateText = (text: string, maxLength: number = 35) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <TableRow>
      <TableCell className="font-medium w-[25%]">{skill.title}</TableCell>
      <TableCell className="w-[25%]" title={skill.subcategory}>
        {truncateText(skill.subcategory)}
      </TableCell>
      <TableCell className="w-[12.5%] text-center">
        {skill.level === "beginner" && <SkillLevelIcon level="beginner" />}
      </TableCell>
      <TableCell className="w-[12.5%] text-center">
        {skill.level === "intermediate" && <SkillLevelIcon level="intermediate" />}
      </TableCell>
      <TableCell className="w-[12.5%] text-center">
        {skill.level === "advanced" && <SkillLevelIcon level="advanced" />}
      </TableCell>
      <TableCell className="w-[12.5%] text-center">
        <button
          onClick={() => onGrowthClick(skill)}
          className={`inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-full text-sm ${
            skill.growth === "0%" ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
          }`}
        >
          ↗ {skill.growth}
        </button>
      </TableCell>
    </TableRow>
  );
};