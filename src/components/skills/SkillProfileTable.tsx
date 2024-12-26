import { Table, TableHeader, TableBody, TableHead, TableRow } from "@/components/ui/table";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { SkillProfileRow } from "./types";
import { roleSkills } from './data/roleSkills';
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { useEmployeeStore } from "../employee/store/employeeStore";
import { getBaseRole } from "../EmployeeTable";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { useCompetencyStateReader } from "./competency/CompetencyStateReader";
import { TrackProvider } from "./context/TrackContext";
import { normalizeSkillTitle } from './utils/normalization';
import { calculateAverageBenchmark } from './utils/benchmarkCalculations';
import { SkillProfileTableRow } from './table/SkillProfileTableRow';

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
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const employees = useEmployeeStore((state) => state.employees);

  const getEmployeeCount = (roleName: string) => {
    return employees.filter(emp => getBaseRole(emp.role) === roleName).length;
  };

  const rows: SkillProfileRow[] = Object.entries(roleSkills).map(([id, role]) => {
    const allRoleSkills = [
      ...role.specialized,
      ...role.common,
      ...role.certifications
    ].map(skill => ({
      ...skill,
      normalizedTitle: normalizeSkillTitle(skill.title)
    }));
    
    const normalizedToggledSkills = new Set(
      Array.from(toggledSkills).map(skillTitle => normalizeSkillTitle(skillTitle))
    );

    const toggledSkillsCount = allRoleSkills.filter(skill => 
      normalizedToggledSkills.has(skill.normalizedTitle)
    ).length;

    console.log('Calculating toggled skills for role:', {
      roleId: id,
      roleTitle: role.title,
      totalSkills: allRoleSkills.length,
      toggledCount: toggledSkillsCount
    });

    const employeeCount = getEmployeeCount(role.title);
    const averageBenchmark = calculateAverageBenchmark(
      id,
      role.title,
      employees.filter(emp => getBaseRole(emp.role) === role.title),
      getSkillCompetencyState,
      toggledSkills
    );

    return {
      id,
      name: role.title,
      function: "Engineering",
      skillCount: String(toggledSkillsCount),
      employees: String(employeeCount),
      matches: `${averageBenchmark}%`,
      lastUpdated: "10/20/24"
    };
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSelection = e.target.checked ? filteredRows.map(row => row.id) : [];
    setSelectedRows(newSelection);
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const filteredRows = rows.filter(row => {
    const matchesFunction = !selectedFunction || 
      row.function.toLowerCase() === selectedFunction.toLowerCase();
    const matchesJobTitle = !selectedJobTitle || 
      row.name.toLowerCase() === selectedJobTitle.toLowerCase();
    
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
            <TableHead className="w-[10%] text-right whitespace-nowrap h-12">
              Last Updated
            </TableHead>
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
              <SkillProfileTableRow
                key={row.id}
                row={row}
                isSelected={selectedRows.includes(row.id)}
                onSelect={handleSelectRow}
              />
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