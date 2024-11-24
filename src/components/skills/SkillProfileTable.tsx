import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { SkillProfileRow } from "./types";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface SkillProfileTableProps {
  selectedFunction?: string;
}

export const SkillProfileTable = ({ selectedFunction }: SkillProfileTableProps) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedJobTitles, setSelectedJobTitles] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  
  const rows: SkillProfileRow[] = [
    { id: "123", name: "AI Engineer", function: "Engineering", skillCount: "16", employees: "2", matches: "$180,178", lastUpdated: "10/20/24" },
    { id: "124", name: "Backend Engineer", function: "Engineering", skillCount: "12", employees: "3", matches: "$175,000", lastUpdated: "10/20/24" },
    { id: "125", name: "Frontend Engineer", function: "Engineering", skillCount: "17", employees: "0", matches: "$170,000", lastUpdated: "10/20/24" },
    { id: "126", name: "Engineering Manager", function: "Engineering", skillCount: "11", employees: "2", matches: "$190,000", lastUpdated: "10/20/24" }
  ];

  const jobTitles = rows.map(row => row.name);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSelection = e.target.checked ? rows.map(row => row.id) : [];
    setSelectedRows(newSelection);
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows(prev => {
      const newSelection = prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id];
      return newSelection;
    });
  };

  const filteredRows = selectedFunction 
    ? rows.filter(row => row.function.toLowerCase() === selectedFunction.toLowerCase())
    : rows;

  console.log('Filtering skill profiles by function:', selectedFunction);
  console.log('Filtered rows:', filteredRows);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between w-[200px]"
            >
              {selectedJobTitles.length > 0
                ? `${selectedJobTitles.length} selected`
                : "Select job titles..."}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search job titles..." />
              <CommandEmpty>No job title found.</CommandEmpty>
              <CommandGroup>
                {jobTitles.map((title) => (
                  <CommandItem
                    key={title}
                    onSelect={() => {
                      setSelectedJobTitles((prev) => {
                        const newSelection = prev.includes(title)
                          ? prev.filter((t) => t !== title)
                          : [...prev, title];
                        return newSelection;
                      });
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedJobTitles.includes(title) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {title}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        {selectedJobTitles.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {selectedJobTitles.map((title) => (
              <Badge
                key={title}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {title}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onClick={() => {
                    setSelectedJobTitles((prev) =>
                      prev.filter((t) => t !== title)
                    );
                  }}
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-border">
            <TableHead className="w-[5%] h-12">
              <input 
                type="checkbox" 
                className="rounded border-gray-300"
                onChange={handleSelectAll}
                checked={selectedRows.length === filteredRows.length && filteredRows.length > 0}
              />
            </TableHead>
            <TableHead className="w-[22%] h-12">
              <div className="flex items-center gap-1">
                Job Title <ChevronDown className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="w-[18%] h-12">Function</TableHead>
            <TableHead className="w-[15%] text-center h-12">Skill Count</TableHead>
            <TableHead className="w-[15%] text-center h-12">Employees</TableHead>
            <TableHead className="w-[15%] text-center h-12">Market Pricer</TableHead>
            <TableHead className="w-[10%] text-right whitespace-nowrap h-12">Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                No profile found
              </TableCell>
            </TableRow>
          ) : (
            filteredRows.map((row) => (
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
                <TableCell className="text-center align-middle">{row.matches}</TableCell>
                <TableCell className="text-right align-middle text-muted-foreground">{row.lastUpdated}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};