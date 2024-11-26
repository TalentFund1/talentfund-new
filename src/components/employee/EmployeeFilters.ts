import { Employee } from "../types/employeeTypes";
import { getSkillProfileId, getBaseRole } from "../EmployeeTable";

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
  console.log('Starting employee filtering with criteria:', {
    searchedEmployees,
    selectedDepartment,
    selectedJobTitle,
    selectedLevel,
    selectedOffice,
    selectedEmploymentType,
    selectedManager
  });

  return employees.filter(employee => {
    // Direct role ID matching
    const employeeRoleId = getSkillProfileId(employee.role);
    const matchesJobTitle = selectedJobTitle.length === 0 || 
      selectedJobTitle.some(roleId => roleId === employeeRoleId);

    console.log(`Role ID matching for ${employee.name}:`, {
      employeeRoleId,
      selectedJobTitle,
      matchesJobTitle
    });

    const matchesEmployeeSearch = searchedEmployees.length === 0 || 
      searchedEmployees.includes(employee.name);

    const matchesDepartment = selectedDepartment.length === 0 || 
      selectedDepartment.includes(employee.department);

    const matchesLevel = selectedLevel.length === 0 || 
      selectedLevel.includes(getBaseRole(employee.role));

    const matchesOffice = selectedOffice.length === 0 || 
      selectedOffice.includes(employee.office);

    const matchesEmploymentType = selectedEmploymentType.length === 0 ||
      selectedEmploymentType.includes(employee.category);

    const matchesManager = selectedManager.length === 0 ||
      (employee.manager && selectedManager.includes(employee.manager));

    const matches = matchesEmployeeSearch && matchesDepartment && matchesJobTitle && 
           matchesLevel && matchesOffice && matchesEmploymentType && matchesManager;

    console.log(`Filter results for ${employee.name}:`, {
      matchesEmployeeSearch,
      matchesDepartment,
      matchesJobTitle,
      matchesLevel,
      matchesOffice,
      matchesEmploymentType,
      matchesManager,
      finalResult: matches
    });
    
    return matches;
  });
};