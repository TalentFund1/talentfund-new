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
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Compensation Analysis</h3>
        <p className="text-sm">
          <span className="font-medium">Compensation Range: {salaryRange}:</span> {observations}
        </p>
        <p className="text-sm text-muted-foreground">{locationData}</p>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role Name</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>Salary Range</TableHead>
              <TableHead>10th</TableHead>
              <TableHead>25th</TableHead>
              <TableHead>50th</TableHead>
              <TableHead>75th</TableHead>
              <TableHead>90th</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salaryData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.role}</TableCell>
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
        <img src="/lightcast-logo.png" alt="Powered by Lightcast" className="h-6" />
      </div>
    </div>
  );
};