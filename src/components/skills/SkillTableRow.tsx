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

export const SkillTableRow = ({ skill, onGrowthClick }: SkillTableRowProps) => (
  <TableRow>
    <TableCell className="font-medium">{skill.title}</TableCell>
    <TableCell>{skill.subcategory}</TableCell>
    <TableCell className="text-center">
      {skill.level === "beginner" && <SkillLevelIcon level="beginner" />}
    </TableCell>
    <TableCell className="text-center">
      {skill.level === "intermediate" && <SkillLevelIcon level="intermediate" />}
    </TableCell>
    <TableCell className="text-center">
      {skill.level === "advanced" && <SkillLevelIcon level="advanced" />}
    </TableCell>
    <TableCell>
      <span 
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm cursor-pointer hover:opacity-80 transition-opacity ${
          skill.growth === "0%" ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
        }`}
        onClick={() => onGrowthClick(skill)}
      >
        ↗ {skill.growth}
      </span>
    </TableCell>
  </TableRow>
);