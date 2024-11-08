import { TableCell, TableRow } from "@/components/ui/table";

interface CompensationRowProps {
  role: string;
  level: string;
  currency: string;
  range: string;
  percentiles: string[];
  index: number;
}

export const CompensationTableRow = ({ role, level, currency, range, percentiles, index }: CompensationRowProps) => {
  return (
    <TableRow className={`group transition-all duration-200 hover:bg-muted/50 ${
      index % 2 === 0 ? 'bg-muted/5' : ''
    }`}>
      <TableCell className="px-4 py-4 font-semibold text-sm border-r border-border">{role}</TableCell>
      <TableCell className="px-4 py-4 font-medium text-sm border-r border-border">{level}</TableCell>
      <TableCell className="px-4 py-4 text-sm border-r border-border">{currency}</TableCell>
      <TableCell className="px-4 py-4 font-medium text-sm border-r border-border">{range}</TableCell>
      {percentiles.map((value, i) => (
        <TableCell 
          key={i} 
          className="px-4 py-4 text-center font-medium text-sm border-r last:border-r-0 border-border bg-[#F7F9FF]/30 group-hover:bg-transparent"
        >
          {value}
        </TableCell>
      ))}
    </TableRow>
  );
};