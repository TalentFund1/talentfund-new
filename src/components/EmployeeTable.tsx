import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
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
import { EMPLOYEE_IMAGES } from "./employee/EmployeeData";
import { useEmployeeStore } from "./employee/store/employeeStore";
import { ToggledSkillsProvider } from "./skills/context/ToggledSkillsContext";

interface EmployeeTableProps {
  selectedDepartment?: string[];
  selectedJobTitle?: string[];
  selectedLevel?: string[];
  selectedOffice?: string[];
  selectedEmploymentType?: string[];
  selectedSkills?: string[];
  selectedEmployees?: string[];
  selectedManager?: string[];
}

export const getSkillProfileId = (role: string) => {
  // Standardize role ID format
  const validProfileIds = ["123", "124", "125", "126", "127", "128", "129", "130"];
  
  // If a valid ID is passed directly, use it
  if (validProfileIds.includes(role)) {
    console.log('Using direct role ID:', role);
    return role;
  }

  // Map all roles to use the same base structure
  const roleMap: { [key: string]: string } = {
    "AI Engineer": "123",
    "Backend Engineer": "123", // Now using same base as AI Engineer
    "Frontend Engineer": "123", // Now using same base as AI Engineer
    "Engineering Manager": "123", // Now using same base as AI Engineer
    "Data Engineer": "123", // Now using same base as AI Engineer
    "DevOps Engineer": "123", // Now using same base as AI Engineer
    "Product Manager": "123", // Now using same base as AI Engineer
    "Frontend Developer": "123" // Now using same base as AI Engineer
  };
  
  const baseRole = role.split(":")[0].trim();
  const mappedId = roleMap[baseRole];
  
  console.log('Role mapping:', { 
    originalRole: role,
    baseRole,
    mappedId,
    usingStandardizedLogic: true
  });
  
  return mappedId || "123"; // Default to AI Engineer base logic
};

export const getBaseRole = (role: string) => {
  return role.split(":")[0].trim();
};

export const getLevel = (role: string) => {
  const parts = role.split(":");
  return parts.length > 1 ? parts[1].trim() : "";
};

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
  const employees = useEmployeeStore((state) => {
    console.log('Current employees in store:', state.employees);
    return state.employees;
  });

  const preFilteredEmployees = filterEmployees(
    employees,
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

  const skillFilteredEmployees = filterEmployeesBySkills(preFilteredEmployees, selectedSkills);

  console.log('Skill filtered employees:', skillFilteredEmployees);

  const filteredEmployees = sortEmployeesByRoleMatch(
    skillFilteredEmployees,
    selectedJobTitle,
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
                <td colSpan={selectedSkills.length > 0 ? 6 : 5} className="text-center py-4 text-muted-foreground">
                  No employees found
                </td>
              </tr>
            ) : (
              <ToggledSkillsProvider>
                {filteredEmployees.map((employee, index) => (
                  <EmployeeTableRow
                    key={employee.id}
                    employee={employee}
                    isSelected={selectedRows.includes(employee.name)}
                    onSelect={handleSelectEmployee}
                    imageUrl={`https://images.unsplash.com/${EMPLOYEE_IMAGES[index % EMPLOYEE_IMAGES.length]}?auto=format&fit=crop&w=24&h=24`}
                    selectedSkills={selectedSkills}
                    selectedJobTitle={selectedJobTitle}
                  />
                ))}
              </ToggledSkillsProvider>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
