import { TableCell } from "@/components/ui/table";
import { columnStyles } from "./CompetencyStyles";

interface CompetencySkillCellProps {
  details: {
    level: string;
    required: string;
  };
}

export const CompetencySkillCell = ({ details }: CompetencySkillCellProps) => {
  const getLevelStyles = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-orange-100 text-orange-800";
      case "advanced":
        return "bg-purple-100 text-purple-800";
      default:
        return "text-muted-foreground/30";
    }
  };

  return (
    <TableCell className={columnStyles.cellBase}>
      {details.level !== "-" ? (
        <div className="flex flex-col items-center gap-0.5">
          <div className={`px-3 py-1 rounded-full text-sm ${getLevelStyles(details.level)}`}>
            {details.level}
          </div>
          <div className="text-sm text-muted-foreground">
            {details.required}
          </div>
        </div>
      ) : (
        <span className="text-muted-foreground/30">-</span>
      )}
    </TableCell>
  );
};