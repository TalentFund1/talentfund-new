import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export const SkillProfileTable = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  
  const rows = [
    { id: "1", name: "AI Engineer", function: "Engineering", skillCount: "16", employees: "2", matches: "0", lastUpdated: "10/20/24" },
    { id: "2", name: "Backend Engineer", function: "Engineering", skillCount: "12", employees: "3", matches: "4", lastUpdated: "10/20/24" },
    { id: "3", name: "Frontend Engineer", function: "Engineering", skillCount: "17", employees: "0", matches: "5", lastUpdated: "10/20/24" },
    { id: "4", name: "Engineering Manager", function: "Engineering", skillCount: "11", employees: "2", matches: "5", lastUpdated: "10/20/24" }
  ];

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(rows.map(row => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent border-b border-border">
          <TableHead className="w-[5%] h-12">
            <input 
              type="checkbox" 
              className="rounded border-gray-300"
              onChange={handleSelectAll}
              checked={selectedRows.length === rows.length && rows.length > 0}
            />
          </TableHead>
          <TableHead className="w-[22%] h-12">
            <div className="flex items-center gap-1">
              Role Name <ChevronDown className="h-4 w-4" />
            </div>
          </TableHead>
          <TableHead className="w-[18%] h-12">Function</TableHead>
          <TableHead className="w-[15%] text-center h-12">Skill Count</TableHead>
          <TableHead className="w-[15%] text-center h-12">Employees</TableHead>
          <TableHead className="w-[15%] text-center h-12">Profile Matches</TableHead>
          <TableHead className="w-[10%] text-right whitespace-nowrap h-12">Last Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id} className="h-16 hover:bg-muted/50 transition-colors border-b border-border">
            <TableCell className="align-middle">
              <input 
                type="checkbox" 
                className="rounded border-gray-300"
                checked={selectedRows.includes(row.id)}
                onChange={() => handleSelectRow(row.id)}
              />
            </TableCell>
            <TableCell className="align-middle font-medium">
              <Link to={`/skills/${row.name.toLowerCase().replace(' ', '-')}`} className="text-primary hover:underline">
                {row.name}
              </Link>
            </TableCell>
            <TableCell className="align-middle">{row.function}</TableCell>
            <TableCell className="text-center align-middle">{row.skillCount}</TableCell>
            <TableCell className="text-center align-middle">{row.employees}</TableCell>
            <TableCell className="text-center align-middle">{row.matches}</TableCell>
            <TableCell className="text-right align-middle text-muted-foreground">{row.lastUpdated}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};