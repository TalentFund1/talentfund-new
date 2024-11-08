import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";

export const CompensationTable = () => {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Compensation Analysis</h3>
        
        <div className="space-y-4">
          <p className="text-secondary-foreground">
            <span className="font-medium">Compensation Range: $130,456 - $170,439:</span> There are 749 advertised salary observations (10% of the 6,749 matching postings).
          </p>
          
          <p className="text-secondary-foreground">
            Typical compensation in New York, NYC ranges from $130,456 - $170,439. The median wage is $150,447, which is about the same as the national median. When you adjust the median wage for location cost of living (which is 2.4% below the average) workers "feel like" they make $154,147.
          </p>
        </div>

        <div className="mt-6 overflow-x-auto">
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
              <TableRow>
                <TableCell>Artificial Engineer</TableCell>
                <TableCell>P3</TableCell>
                <TableCell>USD</TableCell>
                <TableCell>$110,000-115,000</TableCell>
                <TableCell>$110,500</TableCell>
                <TableCell>$111,250</TableCell>
                <TableCell>$112,500</TableCell>
                <TableCell>$113,750</TableCell>
                <TableCell>$114,500</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Artificial Engineer</TableCell>
                <TableCell>P4</TableCell>
                <TableCell>USD</TableCell>
                <TableCell>$120,000-125,000</TableCell>
                <TableCell>$120,500</TableCell>
                <TableCell>$121,500</TableCell>
                <TableCell>$122,500</TableCell>
                <TableCell>$123,750</TableCell>
                <TableCell>$124,500</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Artificial Engineer</TableCell>
                <TableCell>P5</TableCell>
                <TableCell>USD</TableCell>
                <TableCell>$130,000-145,000</TableCell>
                <TableCell>$131,500</TableCell>
                <TableCell>$133,750</TableCell>
                <TableCell>$137,500</TableCell>
                <TableCell>$141,250</TableCell>
                <TableCell>$143,500</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="flex justify-end mt-4">
            <p className="text-sm text-secondary-foreground">Powered by Lightcast</p>
          </div>
        </div>
      </div>
    </Card>
  );
};