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
      <TableCell className="font-medium w-[200px]">{skill.title}</TableCell>
      <TableCell className="w-[250px]" title={skill.subcategory}>
        {truncateText(skill.subcategory)}
      </TableCell>
      <TableCell className="text-center bg-[#F7F9FF]/50 border-x border-border">
        {skill.level === "beginner" && <SkillLevelIcon level="beginner" />}
      </TableCell>
      <TableCell className="text-center bg-[#F7F9FF]/50 border-x border-border">
        {skill.level === "intermediate" && <SkillLevelIcon level="intermediate" />}
      </TableCell>
      <TableCell className="text-center bg-[#F7F9FF]/50 border-x border-border">
        {skill.level === "advanced" && <SkillLevelIcon level="advanced" />}
      </TableCell>
      <TableCell className="text-center w-[150px]">
        <span 
          className={`inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-full text-sm cursor-pointer hover:opacity-80 transition-opacity ${
            skill.growth === "0%" ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
          }`}
          onClick={() => onGrowthClick(skill)}
        >
          ↗ {skill.growth}
        </span>
      </TableCell>
    </TableRow>
  );
};