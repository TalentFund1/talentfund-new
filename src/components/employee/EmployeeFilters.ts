import { Employee } from "../types/employeeTypes";
import { getBaseRole } from "../EmployeeTable";

export const filterEmployees = (
  employees: Employee[],
  searchedEmployees: string[],
  selectedDepartment: string[],
  selectedLevel: string[],
  selectedOffice: string[],
  selectedEmploymentType: string[],
  selectedSkills: string[],
  selectedManager: string[] = []
): Employee[] => {
  console.log('Filtering employees with criteria:', {
    searchedEmployees,
    selectedDepartment,
    selectedLevel,
    selectedOffice,
    selectedEmploymentType,
    selectedManager,
    totalEmployees: employees.length
  });

  return employees.filter(employee => {
    const matchesEmployeeSearch = searchedEmployees.length === 0 || 
      searchedEmployees.includes(employee.name);

    const matchesDepartment = selectedDepartment.length === 0 || 
      selectedDepartment.includes(employee.department);
    
    const matchesLevel = selectedLevel.length === 0 || 
      selectedLevel.includes(employee.role.split(':')[1]?.trim());

    const matchesOffice = selectedOffice.length === 0 || 
      selectedOffice.includes(employee.location.split(',')[0].trim());

    const matchesEmploymentType = selectedEmploymentType.length === 0 ||
      selectedEmploymentType.includes(employee.category);

    const matchesManager = selectedManager.length === 0 ||
      (employee.manager && selectedManager.includes(employee.manager));

    const matches = matchesEmployeeSearch && matchesDepartment && 
           matchesLevel && matchesOffice && matchesEmploymentType && matchesManager;

    console.log(`Employee ${employee.name} filtering results:`, {
      role: employee.role,
      level: employee.role.split(':')[1]?.trim(),
      matches,
      matchesEmployeeSearch,
      matchesDepartment,
      matchesLevel,
      matchesOffice,
      matchesEmploymentType,
      matchesManager
    });

    return matches;
  });
};