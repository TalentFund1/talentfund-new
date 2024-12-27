import { useMemo } from "react";
import { Employee } from "../../types/employeeTypes";
import { EmployeeTableHeader } from "../EmployeeTableHeader";
import { EmployeeTableRow } from "../EmployeeTableRow";
import { filterEmployeesBySkills } from "../EmployeeSkillsFilter";
import { filterEmployees } from "../EmployeeFilters";
import { sortEmployeesByRoleMatch } from "../EmployeeMatchSorter";
import { useSkillsMatrixStore } from "../../benchmark/skills-matrix/SkillsMatrixState";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { EMPLOYEE_IMAGES } from "../EmployeeData";
import { useEmployeeTableState } from "../EmployeeTableState";

interface EmployeeTableContentProps {
  employees: Employee[];
  selectedDepartment?: ReadonlyArray<string>;
  selectedLevel?: ReadonlyArray<string>;
  selectedOffice?: ReadonlyArray<string>;
  selectedEmploymentType?: ReadonlyArray<string>;
  selectedSkills?: ReadonlyArray<string>;
  selectedEmployees?: ReadonlyArray<string>;
  selectedManager?: ReadonlyArray<string>;
  selectedRole?: ReadonlyArray<string>;
}

export const EmployeeTableContent = ({
  employees,
  selectedDepartment = [],
  selectedLevel = [],
  selectedOffice = [],
  selectedEmploymentType = [],
  selectedSkills = [],
  selectedEmployees = [],
  selectedManager = [],
  selectedRole = []
}: EmployeeTableContentProps) => {
  const { getSkillState } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { selectedRows, handleSelectAll, handleSelectEmployee } = useEmployeeTableState();

  const preFilteredEmployees = filterEmployees(
    employees,
    [...selectedEmployees],
    [...selectedDepartment],
    [...selectedLevel],
    [...selectedOffice],
    [...selectedEmploymentType],
    [...selectedSkills],
    [...selectedManager]
  );

  console.log('Pre-filtered employees:', preFilteredEmployees);

  const skillFilteredEmployees = filterEmployeesBySkills(preFilteredEmployees, [...selectedSkills]);

  console.log('Skill filtered employees:', skillFilteredEmployees);

  const filteredEmployees = sortEmployeesByRoleMatch(
    skillFilteredEmployees,
    [...selectedRole],
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
                  selectedSkills={[...selectedSkills]}
                  selectedJobTitle={[...selectedRole]}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};