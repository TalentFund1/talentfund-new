import { TableCell, TableRow } from "@/components/ui/table";
import { SkillLevelIcon } from "./SkillLevelIcon";

interface SkillTableRowProps {
  skill: {
    title: string;
    subcategory: string;
    level: string;
    growth: string;
  };
  onGrowthClick: (skill: { title: string; growth: string }) => void;
}

export const SkillTableRow = ({ skill, onGrowthClick }: SkillTableRowProps) => {
  const truncateText = (text: string, maxLength: number = 35) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <TableRow>
      <TableCell className="font-medium w-[30%]">{skill.title}</TableCell>
      <TableCell className="w-[30%]" title={skill.subcategory}>
        {truncateText(skill.subcategory)}
      </TableCell>
      <TableCell className="w-[13.33%] text-center">
        {skill.level === "beginner" && <SkillLevelIcon level="beginner" />}
      </TableCell>
      <TableCell className="w-[13.33%] text-center">
        {skill.level === "intermediate" && <SkillLevelIcon level="intermediate" />}
      </TableCell>
      <TableCell className="w-[13.33%] text-center">
        {skill.level === "advanced" && <SkillLevelIcon level="advanced" />}
      </TableCell>
    </TableRow>
  );
};