import { Employee } from "../types/employeeTypes";
import { getBaseRole, getSkillProfileId } from "../EmployeeTable";

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

    // Match by role ID only
    const matchesJobTitle = selectedJobTitle.length === 0 || 
      selectedJobTitle.some(selectedRoleId => {
        const employeeRoleId = getSkillProfileId(employee.role);
        
        console.log('Matching role ID:', {
          employee: employee.name,
          employeeRole: employee.role,
          employeeRoleId,
          selectedRoleId,
          matches: employeeRoleId === selectedRoleId
        });

        return employeeRoleId === selectedRoleId;
      });
    
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

    console.log(`Employee ${employee.name} matches:`, {
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

import { getLevel } from "../EmployeeTable";