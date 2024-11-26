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
import { useEffect, useState } from "react";

export const getSkillProfileId = (role: string) => {
  if (!role) {
    console.warn('No role provided to getSkillProfileId');
    return null;
  }

  // Map role titles to IDs with consistent structure
  const roleMap: { [key: string]: string } = {
    "AI Engineer": "123",
    "Backend Engineer": "124",
    "Frontend Engineer": "125",
    "Engineering Manager": "126",
    "Data Engineer": "127",
    "DevOps Engineer": "128",
    "Product Manager": "129"
  };
  
  // First check if it's a direct role ID
  const validProfileIds = Object.values(roleMap);
  if (validProfileIds.includes(role)) {
    console.log('Using direct role ID:', role);
    return role;
  }

  const baseRole = role.split(":")[0].trim();
  const mappedId = roleMap[baseRole];
  
  console.log('Role mapping:', { 
    originalRole: role,
    baseRole,
    mappedId
  });
  
  if (!mappedId) {
    console.warn('No role mapping found for:', role);
    return null;
  }
  
  return mappedId;
};

export const getBaseRole = (role: string) => {
  return role?.split(":")[0].trim() || "";
};

export const getLevel = (role: string) => {
  const parts = role?.split(":");
  return parts?.length > 1 ? parts[1].trim() : "";
};

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
  const [isInitialized, setIsInitialized] = useState(false);
  
  const employees = useEmployeeStore((state) => {
    console.log('Current employees in store:', state.employees);
    return state.employees;
  });

  // Initialize states and check dependencies
  useEffect(() => {
    if (currentStates && toggledSkills && getSkillCompetencyState) {
      // Validate that we can get role IDs for all employees
      const allRolesValid = employees.every(emp => {
        const roleId = getSkillProfileId(emp.role);
        if (!roleId) {
          console.warn(`Invalid role mapping for employee ${emp.name}:`, emp.role);
          return false;
        }
        return true;
      });

      console.log('Dependencies initialized:', {
        hasCurrentStates: !!currentStates,
        hasToggledSkills: !!toggledSkills,
        hasCompetencyReader: !!getSkillCompetencyState,
        allRolesValid
      });

      setIsInitialized(allRolesValid);
    }
  }, [currentStates, toggledSkills, getSkillCompetencyState, employees]);

  // Calculate benchmark percentages for each employee
  const employeesWithBenchmarks = isInitialized ? calculateEmployeeBenchmarks(
    employees,
    selectedJobTitle,
    currentStates,
    toggledSkills,
    getSkillCompetencyState
  ) : employees.map(emp => ({ ...emp, benchmark: 0 }));

  console.log('Employees with benchmarks:', employeesWithBenchmarks);

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

  console.log('Pre-filtered employees:', preFilteredEmployees);

  // Apply skills filter
  const skillFilteredEmployees = filterEmployeesBySkills(preFilteredEmployees, selectedSkills);

  console.log('Skill filtered employees:', skillFilteredEmployees);

  // Sort employees by role match and benchmark percentage
  const filteredEmployees = isInitialized ? sortEmployeesByRoleMatch(
    skillFilteredEmployees,
    selectedJobTitle,
    currentStates,
    toggledSkills,
    getSkillCompetencyState
  ) : skillFilteredEmployees;

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
