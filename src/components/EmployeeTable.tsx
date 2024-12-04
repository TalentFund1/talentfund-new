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
import { useEffect } from "react";

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
  const { toggledSkills, setToggledSkills } = useToggledSkills();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { selectedRows, handleSelectAll, handleSelectEmployee } = useEmployeeTableState();
  const employees = useEmployeeStore((state) => {
    console.log('Current employees in store:', state.employees);
    return state.employees;
  });

  // Load toggled skills on mount
  useEffect(() => {
    const loadToggledSkills = () => {
      try {
        const savedSkills = localStorage.getItem('employeeTableToggledSkills');
        if (savedSkills) {
          console.log('Loading saved toggled skills:', JSON.parse(savedSkills));
          setToggledSkills(new Set(JSON.parse(savedSkills)));
        }
      } catch (error) {
        console.error('Error loading toggled skills:', error);
      }
    };

    loadToggledSkills();
  }, [setToggledSkills]);

  // Save toggled skills whenever they change
  useEffect(() => {
    try {
      const skillsArray = Array.from(toggledSkills);
      console.log('Saving toggled skills:', skillsArray);
      localStorage.setItem('employeeTableToggledSkills', JSON.stringify(skillsArray));
    } catch (error) {
      console.error('Error saving toggled skills:', error);
    }
  }, [toggledSkills]);

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

  const skillFilteredEmployees = filterEmployeesBySkills(preFilteredEmployees, selectedSkills);

  const filteredEmployees = sortEmployeesByRoleMatch(
    skillFilteredEmployees,
    selectedRole,
    currentStates,
    toggledSkills,
    getSkillCompetencyState
  ).filter(employee => {
    if (selectedRole.length > 0) {
      return employee.benchmark > 0;
    }
    return true;
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
