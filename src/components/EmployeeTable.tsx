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

export const getSkillProfileId = (role?: string) => {
  const validProfileIds = Object.keys(roleSkills);
  if (validProfileIds.includes(role || '')) {
    console.log('Using direct role ID:', role);
    return role;
  }

  const roleMap = Object.entries(roleSkills).reduce((acc, [id, data]) => {
    acc[data.title] = id;
    return acc;
  }, {} as { [key: string]: string });
  
  if (!role) {
    console.warn('No role provided to getSkillProfileId');
    return '';
  }

  const baseRole = role.split(":")[0].trim();
  const mappedId = roleMap[baseRole];
  
  console.log('Role mapping:', { 
    originalRole: role,
    baseRole,
    mappedId
  });
  
  return mappedId || '';
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
}: Readonly<EmployeeTableProps>) => {
  const { getSkillState } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { selectedRows, handleSelectAll, handleSelectEmployee } = useEmployeeTableState();
  const employees = useEmployeeStore((state) => {
    console.log('Current employees in store:', state.employees);
    return state.employees;
  });

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

export const EmployeeTable = (props: Readonly<EmployeeTableProps>) => {
  return (
    <TrackProvider>
      <EmployeeTableContent {...props} />
    </TrackProvider>
  );
};