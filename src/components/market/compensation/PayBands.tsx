import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const professionalLevels = [
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
];

const managerialLevels = [
  {
    role: "Artificial Engineer Manager",
    level: "M3",
    currency: "USD",
    range: "$160,000-185,000",
    percentiles: ["$161,500", "$166,250", "$172,500", "$178,750", "$183,500"]
  },
  {
    role: "Artificial Engineer Manager",
    level: "M4",
    currency: "USD",
    range: "$180,000-205,000",
    percentiles: ["$181,500", "$186,250", "$192,500", "$198,750", "$203,500"]
  },
  {
    role: "Artificial Engineer Manager",
    level: "M5",
    currency: "USD",
    range: "$200,000-225,000",
    percentiles: ["$201,500", "$206,250", "$212,500", "$218,750", "$223,500"]
  },
  {
    role: "Artificial Engineer Manager",
    level: "M6",
    currency: "USD",
    range: "$220,000-245,000",
    percentiles: ["$221,500", "$226,250", "$232,500", "$238,750", "$243,500"]
  }
];

export const PayBands = () => {
  const [track, setTrack] = useState("Professional");
  const levels = track === "Professional" ? professionalLevels : managerialLevels;

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold text-primary mb-4">Pay Bands</h3>
      
      <div className="space-y-4 text-secondary-foreground">
        <p>Salary Range: <span className="font-bold">$130,456 - $170,439</span></p>
        <p>There are 749 advertised salary observations (11% of the 6,749 matching postings).</p>
      </div>
      
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-muted-foreground">Track:</span>
          <Select value={track} onValueChange={setTrack}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Professional">Professional</SelectItem>
              <SelectItem value="Managerial">Managerial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                <TableHead className="h-12 px-4 text-left font-semibold text-sm text-primary py-4 border-r border-border">Role Name</TableHead>
                <TableHead className="h-12 px-4 text-left font-semibold text-sm text-primary py-4 border-r border-border">Level</TableHead>
                <TableHead className="h-12 px-4 text-left font-semibold text-sm text-primary py-4 border-r border-border">Currency</TableHead>
                <TableHead className="h-12 px-4 text-left font-semibold text-sm text-primary py-4 border-r border-border">Salary Range</TableHead>
                <TableHead className="h-12 px-4 text-center font-semibold text-sm text-primary py-4 border-r border-border">10th</TableHead>
                <TableHead className="h-12 px-4 text-center font-semibold text-sm text-primary py-4 border-r border-border">25th</TableHead>
                <TableHead className="h-12 px-4 text-center font-semibold text-sm text-primary py-4 border-r border-border">50th</TableHead>
                <TableHead className="h-12 px-4 text-center font-semibold text-sm text-primary py-4 border-r border-border">75th</TableHead>
                <TableHead className="h-12 px-4 text-center font-semibold text-sm text-primary py-4">90th</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {levels.map((row, index) => (
                <TableRow 
                  key={`${row.role}-${row.level}`}
                  className={`group transition-all duration-200 hover:bg-muted/50 ${
                    index % 2 === 0 ? 'bg-muted/5' : ''
                  }`}
                >
                  <TableCell className="px-4 py-4 font-medium text-sm border-r border-border">{row.role}</TableCell>
                  <TableCell className="px-4 py-4 font-medium text-sm border-r border-border">{row.level}</TableCell>
                  <TableCell className="px-4 py-4 text-sm border-r border-border">{row.currency}</TableCell>
                  <TableCell className="px-4 py-4 font-medium text-sm border-r border-border">{row.range}</TableCell>
                  {row.percentiles.map((value, i) => (
                    <TableCell 
                      key={i} 
                      className="px-4 py-4 text-center font-medium text-sm border-r last:border-r-0 border-border"
                    >
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
};
