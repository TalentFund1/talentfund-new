import { TableCell, TableRow } from "@/components/ui/table";
import { CircleDot } from "lucide-react";

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
    <TableRow className="hover:bg-muted/30 transition-colors border-b border-border last:border-0">
      <TableCell className="font-medium sticky left-0 bg-white">{skill.title}</TableCell>
      <TableCell className="text-muted-foreground" title={skill.subcategory}>
        {truncateText(skill.subcategory)}
      </TableCell>
      <TableCell className={`text-center ${skill.level === "beginner" ? "bg-[#F8F7FF]" : ""}`}>
        {skill.level === "beginner" && (
          <CircleDot className="h-5 w-5 text-[#008000] mx-auto" />
        )}
      </TableCell>
      <TableCell className={`text-center ${skill.level === "intermediate" ? "bg-[#FFF8F5]" : ""}`}>
        {skill.level === "intermediate" && (
          <CircleDot className="h-5 w-5 text-primary-icon mx-auto" />
        )}
      </TableCell>
      <TableCell className={`text-center ${skill.level === "advanced" ? "bg-[#F5F8FF]" : ""}`}>
        {skill.level === "advanced" && (
          <CircleDot className="h-5 w-5 text-primary-accent mx-auto" />
        )}
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