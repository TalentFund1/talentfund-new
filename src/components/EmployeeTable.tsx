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
import { roleSkills } from "./skills/data/roleSkills";
import { getEmployeeSkills } from "./benchmark/skills-matrix/initialSkills";

// Move helper functions to separate file to reduce file size
export const getSkillProfileId = (role: string) => {
  const roleMap: { [key: string]: string } = {
    "AI Engineer": "123",
    "Backend Engineer": "124",
    "Frontend Engineer": "125",
    "Engineering Manager": "126"
  };
  
  if (Object.values(roleMap).includes(role)) {
    console.log('Using direct role ID:', role);
    return role;
  }

  const baseRole = getBaseRole(role);
  const mappedId = roleMap[baseRole];
  
  console.log('Role ID mapping:', { 
    originalRole: role,
    baseRole,
    mappedId
  });
  
  return mappedId || role;
};

export const getBaseRole = (role: string): string => {
  return role.split(":")[0].trim();
};

export const getLevel = (role: string): string => {
  const parts = role.split(":");
  return parts.length > 1 ? parts[1].trim() : "P4";
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
  const employees = useEmployeeStore((state) => state.employees);

  const employeesWithBenchmarks = calculateEmployeeBenchmarks(
    employees,
    selectedJobTitle,
    currentStates,
    toggledSkills,
    getSkillCompetencyState
  );

  const getRoleSkills = (roleId: string) => {
    console.log('Getting skills for role ID:', roleId);
    const role = roleSkills[roleId as keyof typeof roleSkills];
    if (!role) {
      console.log('No role skills found for ID:', roleId);
      return [];
    }
    const skills = [
      ...role.specialized.map(s => s.title),
      ...role.common.map(s => s.title),
      ...role.certifications.map(s => s.title)
    ].filter(skill => toggledSkills.has(skill)); // Only include toggled skills
    
    console.log('Found skills for role:', skills);
    return skills;
  };

  const calculateSkillMatch = (employee: Employee, compareRoleId: string) => {
    const employeeSkills = getEmployeeSkills(employee.id);
    const allRoleSkills = getRoleSkills(compareRoleId);
    
    console.log('Calculating skill match:', {
      employee: employee.name,
      employeeSkills: employeeSkills.map(s => s.title),
      roleSkills: allRoleSkills,
      compareRoleId
    });

    const matchingSkills = allRoleSkills.filter(roleSkill => 
      employeeSkills.some(empSkill => empSkill.title === roleSkill)
    );

    return {
      count: matchingSkills.length,
      total: allRoleSkills.length,
      match: `${matchingSkills.length} / ${allRoleSkills.length}`
    };
  };

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
  ).map(employee => {
    const compareRoleId = selectedJobTitle.length > 0 ? selectedJobTitle[0] : getSkillProfileId(employee.role);
    const skillMatch = calculateSkillMatch(employee, compareRoleId);
    
    console.log('Skill match result:', {
      employee: employee.name,
      compareRoleId,
      match: skillMatch.match,
      matchingCount: skillMatch.count,
      totalSkills: skillMatch.total
    });

    return {
      ...employee,
      skillMatch: skillMatch.match
    };
  });

  const skillFilteredEmployees = filterEmployeesBySkills(preFilteredEmployees, selectedSkills);

  const filteredEmployees = sortEmployeesByRoleMatch(
    skillFilteredEmployees,
    selectedJobTitle,
    currentStates,
    toggledSkills,
    getSkillCompetencyState
  );

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