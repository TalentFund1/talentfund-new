import { Employee } from "../types/employeeTypes";
import { getBaseRole, getLevel, getSkillProfileId } from "../EmployeeTable";

export const filterEmployees = (
  employees: Employee[],
  searchedEmployees: string[],
  selectedDepartment: string[],
  selectedJobTitle: string[],
  selectedLevel: string[],
  selectedOffice: string[],
  selectedEmploymentType: string[],
  selectedSkills: string[]
): Employee[] => {
  console.log('Filtering employees with criteria:', {
    searchedEmployees,
    selectedDepartment,
    selectedJobTitle,
    selectedLevel,
    selectedOffice,
    selectedEmploymentType
  });

  return employees.filter(employee => {
    const matchesEmployeeSearch = searchedEmployees.length === 0 || 
      searchedEmployees.includes(employee.name);

    const matchesDepartment = selectedDepartment.length === 0 || 
      selectedDepartment.includes(employee.department);
    
    // Match by role ID or base role name
    const matchesJobTitle = selectedJobTitle.length === 0 || 
      selectedJobTitle.some(title => {
        const titleRoleId = getSkillProfileId(title);
        const employeeRoleId = getSkillProfileId(employee.role);
        const baseRoleMatch = getBaseRole(employee.role) === getBaseRole(title);
        
        console.log('Role matching:', {
          employee: employee.name,
          employeeRole: employee.role,
          employeeRoleId,
          selectedTitle: title,
          titleRoleId,
          baseRoleMatch,
          isMatch: titleRoleId === employeeRoleId || baseRoleMatch
        });
        
        return titleRoleId === employeeRoleId || baseRoleMatch;
      });
    
    const matchesLevel = selectedLevel.length === 0 || 
      selectedLevel.includes(getLevel(employee.role));

    const matchesOffice = selectedOffice.length === 0 || 
      selectedOffice.includes(employee.location.split(',')[0].trim());

    const matchesEmploymentType = selectedEmploymentType.length === 0 ||
      selectedEmploymentType.includes(employee.category);

    const matches = matchesEmployeeSearch && matchesDepartment && matchesJobTitle && 
           matchesLevel && matchesOffice && matchesEmploymentType;

    console.log(`Employee ${employee.name} matches filters:`, matches);

    return matches;
  });
};