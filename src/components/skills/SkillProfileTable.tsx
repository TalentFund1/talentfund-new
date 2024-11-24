import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { SkillProfileRow } from "./types";
import { roleSkills } from './data/roleSkills';

interface SkillProfileTableProps {
  selectedFunction?: string;
  selectedJobTitles?: string[];
  selectedSkills?: string[];
}

export const SkillProfileTable = ({ 
  selectedFunction,
  selectedJobTitles = [],
  selectedSkills = []
}: SkillProfileTableProps) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  
  const rows: SkillProfileRow[] = [
    { id: "123", name: "AI Engineer", function: "Engineering", skillCount: "16", employees: "2", matches: "$180,178", lastUpdated: "10/20/24" },
    { id: "124", name: "Backend Engineer", function: "Engineering", skillCount: "12", employees: "3", matches: "$175,000", lastUpdated: "10/20/24" },
    { id: "125", name: "Frontend Engineer", function: "Engineering", skillCount: "17", employees: "0", matches: "$170,000", lastUpdated: "10/20/24" },
    { id: "126", name: "Engineering Manager", function: "Engineering", skillCount: "11", employees: "2", matches: "$190,000", lastUpdated: "10/20/24" }
  ];

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSelection = e.target.checked ? filteredRows.map(row => row.id) : [];
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

  // Helper function to check if a profile has the selected skills
  const hasSelectedSkills = (roleId: string) => {
    if (selectedSkills.length === 0) return true;

    const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
    if (!currentRoleSkills) return false;

    const allRoleSkills = [
      ...currentRoleSkills.specialized,
      ...currentRoleSkills.common,
      ...currentRoleSkills.certifications
    ];

    return selectedSkills.some(selectedSkill =>
      allRoleSkills.some(roleSkill => 
        roleSkill.title.toLowerCase().includes(selectedSkill.toLowerCase())
      )
    );
  };

  // Filter rows based on selected function, job titles, and skills
  const filteredRows = rows.filter(row => {
    const matchesFunction = selectedFunction 
      ? row.function.toLowerCase() === selectedFunction.toLowerCase()
      : true;
      
    const matchesJobTitle = selectedJobTitles.length > 0
      ? selectedJobTitles.some(title => row.name.toLowerCase() === title.toLowerCase())
      : true;

    const matchesSkills = hasSelectedSkills(row.id);

    return matchesFunction && matchesJobTitle && matchesSkills;
  });

  console.log('Filtering skill profiles by function:', selectedFunction);
  console.log('Filtering skill profiles by job titles:', selectedJobTitles);
  console.log('Filtering skill profiles by skills:', selectedSkills);
  console.log('Filtered rows:', filteredRows);

  return (
    <div className="space-y-4">
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
                Role Name <ChevronDown className="h-4 w-4" />
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