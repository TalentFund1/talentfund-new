import { Employee } from "./types/employeeTypes";
import { EmployeeTableHeader } from "./employee/EmployeeTableHeader";
import { EmployeeTableRow } from "./employee/EmployeeTableRow";
import { useSkillsMatrixStore } from "./benchmark/skills-matrix/SkillsMatrixState";
import { useToggledSkills } from "./skills/context/ToggledSkillsContext";
import { useCompetencyStateReader } from "./skills/competency/CompetencyStateReader";
import { filterEmployeesBySkills } from "./employee/EmployeeSkillsFilter";
import { filterEmployees } from "./employee/EmployeeFilters";
import { sortEmployeesByRoleMatch } from "./employee/EmployeeMatchSorter";
import { useEmployeeTableState } from "./employee/EmployeeTableState";
import { calculateEmployeeBenchmarks } from "./employee/EmployeeBenchmarkCalculator";
import { EMPLOYEE_IMAGES, employees } from "./employee/EmployeeData";
import { getEmployeesAddedLastYear } from "./employee/EmployeeUtils";

// Export utility functions
export const getSkillProfileId = (role: string) => {
  // First check if the input is already a valid profile ID
  const validProfileIds = ["123", "124", "125", "126"];
  if (validProfileIds.includes(role)) {
    return role;
  }

  const roleMap: { [key: string]: string } = {
    "AI Engineer": "123",
    "Backend Engineer": "124",
    "Frontend Engineer": "125",
    "Engineering Manager": "126"
  };
  
  const baseRole = role.split(":")[0].trim();
  return roleMap[baseRole] || "123";
};

export const getBaseRole = (role: string) => {
  return role.split(":")[0].trim();
};

export const getLevel = (role: string) => {
  const parts = role.split(":");
  return parts.length > 1 ? parts[1].trim() : "";
};

export { employees, getEmployeesAddedLastYear };

interface EmployeeTableProps {
  selectedDepartment: string[];
  selectedJobTitle: string[];
  selectedLevel?: string[];
  selectedOffice?: string[];
  selectedEmploymentType?: string[];
  selectedSkills?: string[];
  selectedEmployees?: string[];
  selectedManager?: string[];
}

export const EmployeeTable = ({ 
  selectedDepartment = [], 
  selectedJobTitle = [],
  selectedLevel = [],
  selectedOffice = [],
  selectedEmploymentType = [],
  selectedSkills = [],
  selectedEmployees = [],
  selectedManager = []
}: EmployeeTableProps) => {
  const { currentStates } = useSkillsMatrixStore();
  const { toggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { selectedRows, handleSelectAll, handleSelectEmployee } = useEmployeeTableState();

  console.log('Initial filtering params:', {
    selectedDepartment,
    selectedJobTitle,
    selectedLevel,
    selectedOffice,
    selectedEmploymentType,
    selectedSkills,
    selectedManager,
    totalEmployees: employees.length
  });

  // Calculate benchmark percentages for each employee
  const employeesWithBenchmarks = calculateEmployeeBenchmarks(
    employees,
    selectedJobTitle,
    currentStates,
    toggledSkills,
    getSkillCompetencyState
  );

  // Filter employees based on all criteria including skills and employee search
  const preFilteredEmployees = filterEmployees(
    employeesWithBenchmarks,
    selectedEmployees,
    selectedDepartment,
    selectedJobTitle,
    selectedLevel,
    selectedOffice,
    selectedEmploymentType,
    selectedSkills,
    selectedManager
  );

  console.log('After initial filtering:', {
    preFilteredCount: preFilteredEmployees.length,
    filters: {
      department: selectedDepartment,
      jobTitle: selectedJobTitle,
      level: selectedLevel,
      office: selectedOffice,
      employmentType: selectedEmploymentType,
      manager: selectedManager
    }
  });

  // Apply skills filter
  const skillFilteredEmployees = filterEmployeesBySkills(preFilteredEmployees, selectedSkills);

  console.log('After skills filtering:', {
    skillFilteredCount: skillFilteredEmployees.length,
    selectedSkills
  });

  // Sort employees by role match and benchmark percentage
  const filteredEmployees = sortEmployeesByRoleMatch(
    skillFilteredEmployees,
    selectedJobTitle,
    currentStates,
    toggledSkills,
    getSkillCompetencyState
  );

  console.log('Final filtered employees:', {
    finalCount: filteredEmployees.length,
    employees: filteredEmployees.map(e => ({
      name: e.name,
      role: e.role
    }))
  });

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
                <td colSpan={7} className="text-center py-4 text-muted-foreground">
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
                  selectedJobTitle={selectedJobTitle}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};