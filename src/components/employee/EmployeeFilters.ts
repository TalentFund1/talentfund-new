import { Employee } from "../types/employeeTypes";
import { getLevel } from "../EmployeeTable";

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
    // Direct role ID matching
    const matchesJobTitle = selectedJobTitle.length === 0 || 
      selectedJobTitle.includes(employee.id);

    console.log(`Employee ${employee.name} role matching:`, {
      employeeId: employee.id,
      selectedJobTitle,
      matchesJobTitle
    });

    const matchesEmployeeSearch = searchedEmployees.length === 0 || 
      searchedEmployees.includes(employee.name);

    const matchesDepartment = selectedDepartment.length === 0 || 
      selectedDepartment.includes(employee.department);

    const matchesLevel = selectedLevel.length === 0 || 
      selectedLevel.includes(getLevel(employee.role));

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