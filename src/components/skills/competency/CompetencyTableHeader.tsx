import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { columnStyles } from "./CompetencyStyles";

interface CompetencyTableHeaderProps {
  levels: string[];
}

export const CompetencyTableHeader = ({ levels }: CompetencyTableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow className="hover:bg-transparent">
        <TableHead className={`font-semibold bg-background/80 border-r border-border ${columnStyles.skillColumn}`}>
          Skill
        </TableHead>
        {levels.map((level, index) => (
          <TableHead 
            key={level}
            className={`text-center bg-background/80 border-r border-border ${columnStyles.levelColumn}`}
          >
            <div className="font-semibold">{level}</div>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};