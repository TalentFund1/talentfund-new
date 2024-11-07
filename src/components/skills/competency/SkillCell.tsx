import { TableCell } from "@/components/ui/table";
import { getLevelStyles, getRequirementStyles, getRequirementIcon } from "./RequirementUtils";
import { Star, Shield, Target } from "lucide-react";

interface SkillCellProps {
  details: {
    level: string;
    required: string;
  };
  isLastColumn: boolean;
}

export const SkillCell = ({ details, isLastColumn }: SkillCellProps) => {
  const getLevelIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case 'advanced':
        return <Star className="w-4 h-4 text-primary-accent" />;
      case 'intermediate':
        return <Shield className="w-4 h-4 text-primary-icon" />;
      case 'beginner':
        return <Target className="w-4 h-4 text-[#008000]" />;
      default:
        return null;
    }
  };

  return (
    <TableCell 
      className={`text-center p-2 align-middle ${!isLastColumn ? 'border-r' : ''} border-border`}
    >
      {details.level !== "-" ? (
        <div className="flex flex-col items-center gap-0">
          <div className={`${getLevelStyles(details.level)} min-w-[120px]`}>
            <span className="flex items-center gap-2 justify-center text-[15px]">
              {getLevelIcon(details.level)}
              {details.level}
            </span>
          </div>
          <div className={`${getRequirementStyles(details.required, details.level)} min-w-[120px]`}>
            {getRequirementIcon(details.required)}
            <span>{details.required}</span>
          </div>
        </div>
      ) : (
        <span className="text-muted-foreground/30">-</span>
      )}
    </TableCell>
  );
};