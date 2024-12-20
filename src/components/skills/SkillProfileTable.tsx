import { Table, TableBody } from "@/components/ui/table";
import { useState } from "react";
import { roleSkills } from './data/roleSkills';
import { useToggledSkills } from "./context/ToggledSkillsContext";
import { useEmployeeStore } from "../employee/store/employeeStore";
import { getBaseRole } from "../EmployeeTable";
import { calculateBenchmarkPercentage } from "../employee/BenchmarkCalculator";
import { useSkillsMatrixStore } from "../benchmark/skills-matrix/SkillsMatrixState";
import { useCompetencyStateReader } from "./competency/CompetencyStateReader";
import { TrackProvider } from "./context/TrackContext";
import { SkillProfileTableHeader } from "./table/SkillProfileTableHeader";
import { SkillProfileTableRow } from "./table/SkillProfileTableRow";

interface SkillProfileTableProps {
  selectedFunction?: string;
  selectedJobTitle?: string;
}

const SkillProfileTableContent = ({ 
  selectedFunction,
  selectedJobTitle 
}: SkillProfileTableProps) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const { toggledSkills } = useToggledSkills();
  const { currentStates } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const employees = useEmployeeStore((state) => state.employees);
  
  const getEmployeeCount = (roleName: string) => {
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

  const rows = Object.entries(roleSkills).map(([id, role]) => {
    const employeeCount = getEmployeeCount(role.title);

    console.log('Calculating row data for role:', {
      roleId: id,
      roleTitle: role.title,
      employeeCount,
      employees: employees.map(e => ({
        name: e.name,
        role: e.role,
        baseRole: getBaseRole(e.role)
      }))
    });

    return {
      id,
      name: role.title,
      function: "Engineering",
      employees: String(employeeCount),
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
    return matchesFunction && matchesJobTitle;
  });

  return (
    <div className="space-y-4">
      <Table>
        <SkillProfileTableHeader 
          onSelectAll={handleSelectAll}
          allSelected={selectedRows.length === filteredRows.length && filteredRows.length > 0}
          hasRows={filteredRows.length > 0}
        />
        <TableBody>
          {filteredRows.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-4 text-muted-foreground">
                No profile found
              </td>
            </tr>
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