import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

        <div className="mt-6 overflow-x-auto rounded-lg border border-blue-200/60">
          <Table>
            <TableHeader className="bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <TableRow className="hover:bg-transparent border-y border-blue-200/60">
                <TableHead className="h-12 px-4 text-left font-semibold text-sm">Role Name</TableHead>
                <TableHead className="h-12 px-4 text-left font-semibold text-sm">Level</TableHead>
                <TableHead className="h-12 px-4 text-left font-semibold text-sm">Currency</TableHead>
                <TableHead className="h-12 px-4 text-left font-semibold text-sm">Salary Range</TableHead>
                <TableHead className="h-12 px-4 text-center font-semibold text-sm bg-[#F7F9FF]/50">10th</TableHead>
                <TableHead className="h-12 px-4 text-center font-semibold text-sm bg-[#F7F9FF]/50">25th</TableHead>
                <TableHead className="h-12 px-4 text-center font-semibold text-sm bg-[#F7F9FF]/50">50th</TableHead>
                <TableHead className="h-12 px-4 text-center font-semibold text-sm bg-[#F7F9FF]/50">75th</TableHead>
                <TableHead className="h-12 px-4 text-center font-semibold text-sm bg-[#F7F9FF]/50">90th</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  role: "Artificial Engineer",
                  level: "P3",
                  currency: "USD",
                  range: "$110,000-115,000",
                  percentiles: ["$110,500", "$111,250", "$112,500", "$113,750", "$114,500"]
                },
                {
                  role: "Artificial Engineer",
                  level: "P4",
                  currency: "USD",
                  range: "$120,000-125,000",
                  percentiles: ["$120,500", "$121,500", "$122,500", "$123,750", "$124,500"]
                },
                {
                  role: "Artificial Engineer",
                  level: "P5",
                  currency: "USD",
                  range: "$130,000-145,000",
                  percentiles: ["$131,500", "$133,750", "$137,500", "$141,250", "$143,500"]
                }
              ].map((row, index) => (
                <TableRow 
                  key={`${row.role}-${row.level}`}
                  className={`group transition-all duration-200 hover:bg-muted/50 ${
                    index % 2 === 0 ? 'bg-muted/5' : ''
                  }`}
                >
                  <TableCell className="px-4 py-4 font-medium">{row.role}</TableCell>
                  <TableCell className="px-4 py-4">{row.level}</TableCell>
                  <TableCell className="px-4 py-4">{row.currency}</TableCell>
                  <TableCell className="px-4 py-4">{row.range}</TableCell>
                  {row.percentiles.map((value, i) => (
                    <TableCell 
                      key={i} 
                      className="px-4 py-4 text-center bg-[#F7F9FF]/30 group-hover:bg-transparent"
                    >
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-end p-4 border-t border-blue-200/60">
            <p className="text-sm text-secondary-foreground">Powered by Lightcast</p>
          </div>
        </div>
      </div>
    </Card>
  );
};