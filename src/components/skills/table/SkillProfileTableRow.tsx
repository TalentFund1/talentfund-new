import { TableRow, TableCell } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { getBenchmarkColor } from "../utils/benchmarkCalculations";
import type { SkillProfileRow } from "../types";

interface SkillProfileTableRowProps {
  row: SkillProfileRow;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const SkillProfileTableRow = ({ row, isSelected, onSelect }: SkillProfileTableRowProps) => {
  return (
    <TableRow className="h-16 hover:bg-muted/50 transition-colors">
      <TableCell className="align-middle">
        <input 
          type="checkbox" 
          className="rounded border-gray-300"
          checked={isSelected}
          onChange={() => onSelect(row.id)}
        />
      </TableCell>
      <TableCell className="align-middle font-medium">
        <Link 
          to={`/skills/${row.id}`} 
          className="text-primary hover:text-primary-accent transition-colors no-underline"
        >
          {row.name}
        </Link>
      </TableCell>
      <TableCell className="align-middle">{row.function}</TableCell>
      <TableCell className="text-center align-middle">{row.skillCount}</TableCell>
      <TableCell className="text-center align-middle">{row.employees}</TableCell>
      <TableCell className="text-center align-middle">
        <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-sm ${
          getBenchmarkColor(parseInt(row.matches))
        }`}>
          {row.matches}
        </span>
      </TableCell>
      <TableCell className="text-right align-middle text-muted-foreground">
        {row.lastUpdated}
      </TableCell>
    </TableRow>
  );
};