import { Employee } from "../types/employeeTypes";
import { getBaseRole, getLevel } from "../EmployeeTable";

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
  console.log('Starting employee filtering with:', {
    totalEmployees: employees.length,
    filters: {
      searchedEmployees,
      selectedDepartment,
      selectedJobTitle,
      selectedLevel,
      selectedOffice,
      selectedEmploymentType,
      selectedManager
    }
  });

  return employees.filter(employee => {
    const matchesEmployeeSearch = searchedEmployees.length === 0 || 
      searchedEmployees.includes(employee.name);

    const matchesDepartment = selectedDepartment.length === 0 || 
      selectedDepartment.includes(employee.department);
    
    const matchesJobTitle = selectedJobTitle.length === 0 || 
      selectedJobTitle.includes(getBaseRole(employee.role));
    
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

    if (!matches) {
      console.log('Employee filtered out:', {
        name: employee.name,
        reason: {
          employeeSearch: !matchesEmployeeSearch,
          department: !matchesDepartment,
          jobTitle: !matchesJobTitle,
          level: !matchesLevel,
          office: !matchesOffice,
          employmentType: !matchesEmploymentType,
          manager: !matchesManager
        }
      });
    }

    return matches;
  });
};