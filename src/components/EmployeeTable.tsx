import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Employee } from "./types/employeeTypes";
import { EmployeeTableHeader } from "./employee/EmployeeTableHeader";
import { EmployeeTableRow } from "./employee/EmployeeTableRow";
import { useSkillsMatrixStore } from "./benchmark/skills-matrix/SkillsMatrixState";
import { useCompetencyStateReader } from "./skills/competency/CompetencyStateReader";
import { filterEmployeesBySkills } from "./employee/EmployeeSkillsFilter";
import { filterEmployees } from "./employee/EmployeeFilters";
import { sortEmployeesByRoleMatch } from "./employee/EmployeeMatchSorter";
import { useEmployeeTableState } from "./employee/EmployeeTableState";
import { EMPLOYEE_IMAGES } from "./employee/EmployeeData";
import { useEmployeeStore } from "./employee/store/employeeStore";
import { TrackProvider } from "./skills/context/TrackContext";
import { roleSkills } from "./skills/data/roleSkills";
import { useEmployeeSkillsStore } from "./employee/store/employeeSkillsStore";
import { useMemo } from "react";
import { getSkillProfileId } from "./employee/utils/profileUtils";

interface EmployeeTableProps {
  readonly selectedDepartment?: ReadonlyArray<string>;
  readonly selectedLevel?: ReadonlyArray<string>;
  readonly selectedOffice?: ReadonlyArray<string>;
  readonly selectedEmploymentType?: ReadonlyArray<string>;
  readonly selectedSkills?: ReadonlyArray<string>;
  readonly selectedEmployees?: ReadonlyArray<string>;
  readonly selectedManager?: ReadonlyArray<string>;
  readonly selectedRole?: ReadonlyArray<string>;
}

const EmployeeTableContent = ({ 
  selectedDepartment = [], 
  selectedLevel = [],
  selectedOffice = [],
  selectedEmploymentType = [],
  selectedSkills = [],
  selectedEmployees = [],
  selectedManager = [],
  selectedRole = []
}: Readonly<EmployeeTableProps>) => {
  const { getSkillState } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { selectedRows, handleSelectAll, handleSelectEmployee } = useEmployeeTableState();
  const { getEmployeeSkills } = useEmployeeSkillsStore();
  const baseEmployees = useEmployeeStore((state) => state.employees);

  const employees = useMemo(() => {
    console.log('Processing employees with skills');
    const employeesWithSkills = baseEmployees.map(emp => {
      const skills = getEmployeeSkills(emp.id);
      console.log(`Employee ${emp.id} skills:`, skills);
      return {
        ...emp,
        skills
      };
    });
    return employeesWithSkills;
  }, [baseEmployees, getEmployeeSkills]);

  console.log('Employees with skills:', employees.map(emp => ({
    id: emp.id,
    name: emp.name,
    skillCount: emp.skills.length,
    skills: emp.skills.map(s => s.title)
  })));

  const preFilteredEmployees = filterEmployees(
    employees,
    selectedEmployees,
    selectedDepartment,
    selectedLevel,
    selectedOffice,
    selectedEmploymentType,
    selectedSkills,
    selectedManager
  );

  console.log('Pre-filtered employees:', preFilteredEmployees);

  const skillFilteredEmployees = filterEmployeesBySkills(preFilteredEmployees, selectedSkills);

  console.log('Skill filtered employees:', skillFilteredEmployees);

  const filteredEmployees = sortEmployeesByRoleMatch(
    skillFilteredEmployees,
    selectedRole,
    getSkillState,
    new Set(),
    getSkillCompetencyState
  ).filter(employee => {
    if (selectedRole.length > 0) {
      return employee.benchmark > 0;
    }
    return true;
  });

  console.log('Final filtered and sorted employees:', filteredEmployees);

  return (
    <div className="bg-white rounded-lg">
      <div className="relative">
        <table className="w-full">
          <thead>
            <EmployeeTableHeader 
              onSelectAll={(e) => handleSelectAll(filteredEmployees, e)}
              isAllSelected={filteredEmployees.length > 0 && selectedRows.length === filteredEmployees.length}
              hasEmployees={filteredEmployees.length > 0}
              hasSelectedSkills={selectedSkills.length > 0}
            />
          </thead>
          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan={selectedSkills.length > 0 ? 6 : 5} className="text-center py-4 text-muted-foreground">
                  No employees found
                </td>
              </tr>
            ) : (
              filteredEmployees.map((employee, index) => (
                <EmployeeTableRow
                  key={employee.id}
                  employee={employee}
                  isSelected={selectedRows.includes(employee.name)}
                  onSelect={handleSelectEmployee}
                  imageUrl={`https://images.unsplash.com/${EMPLOYEE_IMAGES[index % EMPLOYEE_IMAGES.length]}?auto=format&fit=crop&w=24&h=24`}
                  selectedSkills={selectedSkills}
                  selectedJobTitle={selectedRole}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const EmployeeTable = (props: Readonly<EmployeeTableProps>) => {
  return (
    <TrackProvider>
      <EmployeeTableContent {...props} />
    </TrackProvider>
  );
};
