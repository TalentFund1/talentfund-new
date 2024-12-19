import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { SkillProfileRow } from "./types";
import { roleSkills } from './data/roleSkills';
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { employees } from "../employee/EmployeeData";
import { getBaseRole } from "../EmployeeTable";
import { calculateBenchmarkPercentage } from "../employee/BenchmarkCalculator";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { useCompetencyStateReader } from "../skills/competency/CompetencyStateReader";
import { TrackProvider } from "./context/TrackContext";

interface SkillProfileTableProps {
  selectedFunction?: string;
  selectedSkills: string[];
  selectedJobTitle?: string;
}

const SkillProfileTableContent = ({ 
  selectedFunction,
  selectedSkills,
  selectedJobTitle 
}: SkillProfileTableProps) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { toggledSkills } = useToggledSkills();
  const { currentStates } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  
  const getExactRoleMatches = (roleName: string) => {
    return employees.filter(emp => getBaseRole(emp.role) === roleName).length;
  };

  const calculateAverageBenchmark = (roleId: string, roleName: string) => {
    const matchingEmployees = employees.filter(emp => getBaseRole(emp.role) === roleName);
    if (matchingEmployees.length === 0) return 0;

    const benchmarks = matchingEmployees.map(emp => 
      calculateBenchmarkPercentage(
        emp.id,
        roleId,
        "",
        currentStates,
        toggledSkills,
        getSkillCompetencyState
      )
    );

    const sum = benchmarks.reduce((acc, val) => acc + val, 0);
    return Math.round(sum / benchmarks.length);
  };

  const getBenchmarkColor = (benchmark: number) => {
    if (benchmark >= 90) return 'bg-green-100 text-green-800';
    if (benchmark >= 70) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const rows: SkillProfileRow[] = Object.entries(roleSkills).map(([id, role]) => {
    // Get all skills for the role
    const allRoleSkills = [
      ...role.specialized,
      ...role.common,
      ...role.certifications
    ];
    
    // Filter to only get toggled skills
    const toggledSkillsCount = allRoleSkills.filter(skill => 
      toggledSkills.has(skill.title)
    ).length;

    return {
      id,
      name: role.title,
      function: "Engineering",
      skillCount: String(toggledSkillsCount),
      employees: String(getExactRoleMatches(role.title)),
      matches: `${calculateAverageBenchmark(id, role.title)}%`,
      lastUpdated: "10/20/24"
    };
  });

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

  const filteredRows = rows.filter(row => {
    const matchesFunction = !selectedFunction || row.function.toLowerCase() === selectedFunction.toLowerCase();
    const matchesJobTitle = !selectedJobTitle || row.name.toLowerCase() === selectedJobTitle.toLowerCase();
    
    const roleData = roleSkills[row.id as keyof typeof roleSkills];
    const allProfileSkills = [
      ...(roleData.specialized || []),
      ...(roleData.common || []),
      ...(roleData.certifications || [])
    ];
    
    const hasSelectedSkills = selectedSkills.length === 0 || selectedSkills.some(skill => 
      allProfileSkills.some(profileSkill => 
        profileSkill.title.toLowerCase().includes(skill.toLowerCase())
      )
    );

    return matchesFunction && matchesJobTitle && hasSelectedSkills;
  });

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
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
            <TableHead className="w-[15%] text-center h-12">Benchmark</TableHead>
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
              <TableRow key={row.id} className="h-16 hover:bg-muted/50 transition-colors">
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
                <TableCell className="text-center align-middle">
                  <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-sm ${
                    getBenchmarkColor(parseInt(row.matches))
                  }`}>
                    {row.matches}
                  </span>
                </TableCell>
                <TableCell className="text-right align-middle text-muted-foreground">{row.lastUpdated}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export const SkillProfileTable = (props: SkillProfileTableProps) => {
  return (
    <TrackProvider>
      <SkillProfileTableContent {...props} />
    </TrackProvider>
  );
};
