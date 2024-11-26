import { Employee } from "../types/employeeTypes";
import { getSkillProfileId } from "../EmployeeTable";

export const filterEmployees = (
  employees: Employee[],
  searchedEmployees: string[],
  selectedDepartment: string[],
  selectedJobTitle: string[],  // This is actually roleIds now
  selectedLevel: string[],
  selectedOffice: string[],
  selectedEmploymentType: string[],
  selectedSkills: string[],
  selectedManager: string[] = []
): Employee[] => {
  console.log('Starting employee filtering with roleIds:', {
    searchedEmployees,
    selectedDepartment,
    selectedRoleIds: selectedJobTitle,
    selectedLevel,
    selectedOffice,
    selectedEmploymentType,
    selectedManager
  });

  return employees.filter(employee => {
    const employeeRoleId = getSkillProfileId(employee.role);
    const matchesRoleId = selectedJobTitle.length === 0 || 
      selectedJobTitle.includes(employeeRoleId);

    console.log(`Role ID matching for ${employee.name}:`, {
      employeeRoleId,
      selectedRoleIds: selectedJobTitle,
      matchesRoleId
    });

    const matchesEmployeeSearch = searchedEmployees.length === 0 || 
      searchedEmployees.includes(employee.name);

    const matchesDepartment = selectedDepartment.length === 0 || 
      selectedDepartment.includes(employee.department);

    const matchesLevel = selectedLevel.length === 0 || 
      selectedLevel.includes(employeeRoleId);

    const matchesOffice = selectedOffice.length === 0 || 
      selectedOffice.includes(employee.office);

    const matchesEmploymentType = selectedEmploymentType.length === 0 ||
      selectedEmploymentType.includes(employee.category);

    const matchesManager = selectedManager.length === 0 ||
      (employee.manager && selectedManager.includes(employee.manager));

    const matches = matchesEmployeeSearch && matchesDepartment && matchesRoleId && 
           matchesLevel && matchesOffice && matchesEmploymentType && matchesManager;

    console.log(`Filter results for ${employee.name}:`, {
      matchesEmployeeSearch,
      matchesDepartment,
      matchesRoleId,
      matchesLevel,
      matchesOffice,
      matchesEmploymentType,
      matchesManager,
      finalResult: matches
    });
    
    return matches;
  });
};