import { TableCell } from "@/components/ui/table";
import { getLevelStyles, getRequirementStyles, getRequirementIcon } from "./RequirementUtils";

interface SkillCellProps {
  details: {
    level: string;
    required: string;
  };
  isLastColumn: boolean;
}

export const SkillCell = ({ details, isLastColumn }: SkillCellProps) => {
  return (
    <TableCell 
      className={`text-center p-3 align-middle ${!isLastColumn ? 'border-r' : ''} border-border`}
    >
      {details.level !== "-" ? (
        <div className="flex flex-col items-center gap-0">
          <div className={`${getLevelStyles(details.level)} min-w-[120px]`}>
            {details.level}
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