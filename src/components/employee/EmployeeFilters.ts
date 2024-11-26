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
  selectedSkills: string[],
  selectedManager: string[] = []
): Employee[] => {
  console.log('Filtering employees with criteria:', {
    searchedEmployees,
    selectedDepartment,
    selectedJobTitle,
    selectedLevel,
    selectedOffice,
    selectedEmploymentType,
    selectedManager
  });

  return employees.filter(employee => {
    const matchesEmployeeSearch = searchedEmployees.length === 0 || 
      searchedEmployees.includes(employee.name);

    const matchesDepartment = selectedDepartment.length === 0 || 
      selectedDepartment.includes(employee.department);

    // Match by role ID and include partial matches based on role title
    const matchesJobTitle = selectedJobTitle.length === 0 || 
      selectedJobTitle.some(title => {
        const selectedRoleId = getSkillProfileId(title);
        const employeeRoleId = getSkillProfileId(employee.role);
        const employeeBaseRole = getBaseRole(employee.role);
        const selectedBaseRole = getBaseRole(title);
        
        console.log('Matching job title:', {
          employee: employee.name,
          employeeRole: employee.role,
          employeeRoleId,
          selectedTitle: title,
          selectedRoleId,
          employeeBaseRole,
          selectedBaseRole
        });

        // Match either by role ID or base role title
        return employeeRoleId === selectedRoleId || employeeBaseRole === selectedBaseRole;
      });
    
    const matchesLevel = selectedLevel.length === 0 || 
      selectedLevel.includes(getLevel(employee.role));

    const matchesOffice = selectedOffice.length === 0 || 
      selectedOffice.includes(employee.location.split(',')[0].trim());

    const matchesEmploymentType = selectedEmploymentType.length === 0 ||
      selectedEmploymentType.includes(employee.category);

    const matchesManager = selectedManager.length === 0 ||
      (employee.manager && selectedManager.includes(employee.manager));

    const matches = matchesEmployeeSearch && matchesDepartment && matchesJobTitle && 
           matchesLevel && matchesOffice && matchesEmploymentType && matchesManager;

    console.log(`Employee ${employee.name} matches:`, matches);
    return matches;
  });
};