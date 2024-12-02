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
import { TrackProvider } from "./skills/context/TrackContext";
import { roleSkills } from "./skills/data/roleSkills";

interface EmployeeTableProps {
  selectedDepartment?: string[];
  selectedLevel?: string[];
  selectedOffice?: string[];
  selectedEmploymentType?: string[];
  selectedSkills?: string[];
  selectedEmployees?: string[];
  selectedManager?: string[];
  selectedRole?: string[];
}

export const getSkillProfileId = (role?: string) => {
  if (!role) {
    console.warn('No role provided to getSkillProfileId');
    return '';
  }

  // First check if the role is a direct ID
  if (roleSkills[role]) {
    console.log('Using direct role ID:', role);
    return role;
  }

  // If not, look up the role by occupation
  const baseRole = role.split(":")[0].trim();
  const roleEntry = Object.entries(roleSkills).find(([_, data]) => data.occupation === baseRole);
  
  if (roleEntry) {
    console.log('Found role ID for occupation:', { baseRole, roleId: roleEntry[0] });
    return roleEntry[0];
  }

  console.warn('No matching role ID found for:', baseRole);
  return '';
};

export const getBaseRole = (role?: string) => {
  if (!role) return "";
  return role.split(":")[0].trim();
};

export const getLevel = (role?: string) => {
  if (!role) return "";
  const parts = role.split(":");
  return parts.length > 1 ? parts[1].trim() : "";
};

const EmployeeTableContent = ({ 
  selectedDepartment = [], 
  selectedLevel = [],
  selectedOffice = [],
  selectedEmploymentType = [],
  selectedSkills = [],
  selectedEmployees = [],
  selectedManager = [],
  selectedRole = []
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
    currentStates,
    toggledSkills,
    getSkillCompetencyState
  ).filter(employee => {
    // Only include employees with benchmark > 0% when a role is selected
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

export const EmployeeTable = (props: EmployeeTableProps) => {
  return (
    <TrackProvider>
      <ToggledSkillsProvider>
        <EmployeeTableContent {...props} />
      </ToggledSkillsProvider>
    </TrackProvider>
  );
};
