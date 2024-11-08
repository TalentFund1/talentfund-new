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

        <div className="mt-6 overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary hover:bg-secondary">
                <TableHead className="h-12 px-4 text-left font-medium text-sm text-primary py-4 border-r border-border">Role Name</TableHead>
                <TableHead className="h-12 px-4 text-left font-medium text-sm text-primary py-4 border-r border-border">Level</TableHead>
                <TableHead className="h-12 px-4 text-left font-medium text-sm text-primary py-4 border-r border-border">Currency</TableHead>
                <TableHead className="h-12 px-4 text-left font-medium text-sm text-primary py-4 border-r border-border">Salary Range</TableHead>
                <TableHead className="h-12 px-4 text-center font-medium text-sm text-primary py-4 border-r border-border bg-[#F7F9FF]/50">10th</TableHead>
                <TableHead className="h-12 px-4 text-center font-medium text-sm text-primary py-4 border-r border-border bg-[#F7F9FF]/50">25th</TableHead>
                <TableHead className="h-12 px-4 text-center font-medium text-sm text-primary py-4 border-r border-border bg-[#F7F9FF]/50">50th</TableHead>
                <TableHead className="h-12 px-4 text-center font-medium text-sm text-primary py-4 border-r border-border bg-[#F7F9FF]/50">75th</TableHead>
                <TableHead className="h-12 px-4 text-center font-medium text-sm text-primary py-4 bg-[#F7F9FF]/50">90th</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  role: "Artificial Engineer",
                  level: "P1",
                  currency: "USD",
                  range: "$90,000-95,000",
                  percentiles: ["$90,500", "$91,250", "$92,500", "$93,750", "$94,500"]
                },
                {
                  role: "Artificial Engineer",
                  level: "P2",
                  currency: "USD",
                  range: "$100,000-105,000",
                  percentiles: ["$100,500", "$101,250", "$102,500", "$103,750", "$104,500"]
                },
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
                },
                {
                  role: "Artificial Engineer",
                  level: "P6",
                  currency: "USD",
                  range: "$150,000-175,000",
                  percentiles: ["$151,500", "$156,250", "$162,500", "$168,750", "$173,500"]
                }
              ].map((row, index) => (
                <TableRow 
                  key={`${row.role}-${row.level}`}
                  className={`group transition-all duration-200 hover:bg-muted/50 ${
                    index % 2 === 0 ? 'bg-muted/5' : ''
                  }`}
                >
                  <TableCell className="px-4 py-4 font-medium text-sm border-r border-border">{row.role}</TableCell>
                  <TableCell className="px-4 py-4 text-sm border-r border-border">{row.level}</TableCell>
                  <TableCell className="px-4 py-4 text-sm border-r border-border">{row.currency}</TableCell>
                  <TableCell className="px-4 py-4 text-sm border-r border-border">{row.range}</TableCell>
                  {row.percentiles.map((value, i) => (
                    <TableCell 
                      key={i} 
                      className="px-4 py-4 text-center text-sm border-r last:border-r-0 border-border bg-[#F7F9FF]/30 group-hover:bg-transparent"
                    >
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-end p-4 border-t border-border">
            <p className="text-sm text-secondary-foreground">Powered by Lightcast</p>
          </div>
        </div>
      </div>
    </Card>
  );
};