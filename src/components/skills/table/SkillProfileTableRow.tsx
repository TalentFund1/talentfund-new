import { TableCell, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";

interface SkillProfileTableRowProps {
  row: {
    id: string;
    name: string;
    function: string;
    skillCount: string;
    employees: string;
    matches: string;
    lastUpdated: string;
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const SkillProfileTableRow = ({ row, isSelected, onSelect }: SkillProfileTableRowProps) => {
  const getBenchmarkColor = (benchmark: string) => {
    const value = parseInt(benchmark);
    if (value >= 90) return 'bg-green-100 text-green-800';
    if (value >= 70) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <TableRow key={row.id} className="h-16 hover:bg-muted/50 transition-colors">
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
          getBenchmarkColor(row.matches)
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