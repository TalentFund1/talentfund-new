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
    <TableRow className="hover:bg-muted/30 transition-colors">
      <TableCell className="font-medium">{skill.title}</TableCell>
      <TableCell className="text-muted-foreground" title={skill.subcategory}>
        {truncateText(skill.subcategory)}
      </TableCell>
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
        <div className="flex justify-center">
          <span 
            className={`px-2.5 py-1 rounded-full text-sm font-medium cursor-pointer transition-colors ${
              skill.growth === "0%" 
                ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' 
                : 'bg-green-100 text-green-800 hover:bg-green-200'
            }`}
            onClick={() => onGrowthClick(skill)}
          >
            ↗ {skill.growth}
          </span>
        </div>
      </TableCell>
    </TableRow>
  );
};