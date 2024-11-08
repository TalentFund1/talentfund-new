import { Table, TableBody } from "@/components/ui/table";
import { CompensationTableHeader } from "./table/TableHeader";
import { CompensationTableRow } from "./table/TableRow";

interface CompensationTableProps {
  track: string;
}

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

export const CompensationTable = ({ track }: CompensationTableProps) => {
  const levels = track === "Professional" ? professionalLevels : managerialLevels;

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <Table>
        <CompensationTableHeader />
        <TableBody>
          {levels.map((row, index) => (
            <CompensationTableRow
              key={`${row.role}-${row.level}`}
              role={row.role}
              level={row.level}
              currency={row.currency}
              range={row.range}
              percentiles={row.percentiles}
              index={index}
            />
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end p-4 border-t border-border">
        <p className="text-sm text-secondary-foreground">
          Powered by <span className="text-[#FF0000]">Lightcast</span>
        </p>
      </div>
    </div>
  );
};
