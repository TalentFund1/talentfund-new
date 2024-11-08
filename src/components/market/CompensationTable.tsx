import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

interface SalaryData {
  role: string;
  level: string;
  currency: string;
  range: string;
  percentiles: {
    p10: string;
    p25: string;
    p50: string;
    p75: string;
    p90: string;
  };
}

interface CompensationTableProps {
  salaryRange: string;
  observations: string;
  locationData: string;
  salaryData: SalaryData[];
}

export const CompensationTable = ({
  salaryRange,
  observations,
  locationData,
  salaryData
}: CompensationTableProps) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">Compensation Analysis</h3>
        <div className="space-y-2">
          <p className="text-sm leading-relaxed">
            <span className="font-medium text-foreground">Compensation Range: {salaryRange}:</span> {observations}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">{locationData}</p>
        </div>
      </div>

      <Card className="overflow-hidden border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary hover:bg-secondary">
              <TableHead className="font-medium">Role Name</TableHead>
              <TableHead className="font-medium">Level</TableHead>
              <TableHead className="font-medium">Currency</TableHead>
              <TableHead className="font-medium">Salary Range</TableHead>
              <TableHead className="font-medium">10th</TableHead>
              <TableHead className="font-medium">25th</TableHead>
              <TableHead className="font-medium">50th</TableHead>
              <TableHead className="font-medium">75th</TableHead>
              <TableHead className="font-medium">90th</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salaryData.map((row, index) => (
              <TableRow key={index} className="hover:bg-secondary/50">
                <TableCell className="font-medium">{row.role}</TableCell>
                <TableCell>{row.level}</TableCell>
                <TableCell>{row.currency}</TableCell>
                <TableCell>{row.range}</TableCell>
                <TableCell>{row.percentiles.p10}</TableCell>
                <TableCell>{row.percentiles.p25}</TableCell>
                <TableCell>{row.percentiles.p50}</TableCell>
                <TableCell>{row.percentiles.p75}</TableCell>
                <TableCell>{row.percentiles.p90}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className="flex justify-end">
        <img src="/lightcast-logo.png" alt="Powered by Lightcast" className="h-6 opacity-75 hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
};