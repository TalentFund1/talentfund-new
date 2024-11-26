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
import { EMPLOYEE_IMAGES } from "./employee/EmployeeData";
import { useEmployeeStore } from "./employee/store/employeeStore";
import { ToggledSkillsProvider } from "./skills/context/ToggledSkillsContext";

export const getSkillProfileId = (role: string) => {
  // Map role titles to IDs with consistent structure
  const roleMap: { [key: string]: string } = {
    "AI Engineer": "123",
    "Backend Engineer": "124",
    "Frontend Engineer": "125",
    "Engineering Manager": "126"
  };
  
  // First check if the input is already a role ID
  if (Object.values(roleMap).includes(role)) {
    console.log('Using direct role ID:', role);
    return role;
  }

  // Extract base role from role string (e.g. "Backend Engineer: P4" -> "Backend Engineer")
  const baseRole = getBaseRole(role);
  const mappedId = roleMap[baseRole];
  
  console.log('Role ID mapping:', { 
    originalRole: role,
    baseRole,
    mappedId
  });
  
  return mappedId || "123"; // Default to AI Engineer if no match found
};

// Add exports for the utility functions
export const getBaseRole = (role: string): string => {
  return role.split(":")[0].trim();
};

export const getLevel = (role: string): string => {
  const parts = role.split(":");
  return parts.length > 1 ? parts[1].trim() : "P4"; // Default to P4 if no level specified
};

interface EmployeeTableProps {
  selectedDepartment: string[];
  selectedJobTitle: string[];  // These are actually role IDs now
  selectedLevel?: string[];
  selectedOffice?: string[];
  selectedEmploymentType?: string[];
  selectedSkills?: string[];
  selectedEmployees?: string[];
  selectedManager?: string[];
}

export const EmployeeTable = ({ 
  selectedDepartment = [], 
  selectedJobTitle = [], // These are role IDs
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
  const employees = useEmployeeStore((state) => {
    console.log('Current employees in store:', state.employees);
    return state.employees;
  });

  // Calculate benchmark percentages for each employee
  const employeesWithBenchmarks = calculateEmployeeBenchmarks(
    employees,
    selectedJobTitle,  // Using role IDs
    currentStates,
    toggledSkills,
    getSkillCompetencyState
  );

  console.log('Employees with benchmarks:', employeesWithBenchmarks);

  // Filter employees based on all criteria including skills and employee search
  const preFilteredEmployees = filterEmployees(
    employeesWithBenchmarks,
    selectedEmployees,
    selectedDepartment,
    selectedJobTitle,  // Using role IDs
    selectedLevel,
    selectedOffice,
    selectedEmploymentType,
    selectedSkills,
    selectedManager
  );

  console.log('Pre-filtered employees:', preFilteredEmployees);

  // Apply skills filter
  const skillFilteredEmployees = filterEmployeesBySkills(preFilteredEmployees, selectedSkills);

  console.log('Skill filtered employees:', skillFilteredEmployees);

  // Sort employees by role match and benchmark percentage
  const filteredEmployees = sortEmployeesByRoleMatch(
    skillFilteredEmployees,
    selectedJobTitle,  // Using role IDs
    currentStates,
    toggledSkills,
    getSkillCompetencyState
  );

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
                  selectedRoleId={selectedJobTitle}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
