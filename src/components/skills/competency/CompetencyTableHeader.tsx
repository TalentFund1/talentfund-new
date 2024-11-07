import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { COLUMN_WIDTHS } from "./constants";

export const CompetencyTableHeader = ({ levels }: { levels: string[] }) => {
  return (
    <TableHeader>
      <TableRow className="hover:bg-transparent">
        <TableHead className={`font-semibold bg-background/80 border-r border-border ${COLUMN_WIDTHS.skill}`}>
          Skill
        </TableHead>
        {levels.map((level, index) => (
          <TableHead 
            key={level}
            className={`text-center bg-background/80 ${index !== levels.length - 1 ? 'border-r' : ''} border-border ${COLUMN_WIDTHS.level}`}
          >
            <div className="font-semibold">{level}</div>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};