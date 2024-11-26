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
  selectedManager: string[] = [],
  selectedRoleId: string[] = []
): Employee[] => {
  console.log('Filtering employees with criteria:', {
    searchedEmployees,
    selectedDepartment,
    selectedJobTitle,
    selectedLevel,
    selectedOffice,
    selectedEmploymentType,
    selectedManager,
    selectedRoleId
  });

  return employees.filter(employee => {
    const matchesEmployeeSearch = searchedEmployees.length === 0 || 
      searchedEmployees.includes(employee.name);

    const matchesDepartment = selectedDepartment.length === 0 || 
      selectedDepartment.includes(employee.department);
    
    const matchesLevel = selectedLevel.length === 0 || 
      selectedLevel.includes(getLevel(employee.role));

    const matchesOffice = selectedOffice.length === 0 || 
      selectedOffice.includes(employee.location.split(',')[0].trim());

    const matchesEmploymentType = selectedEmploymentType.length === 0 ||
      selectedEmploymentType.includes(employee.category);

    const matchesManager = selectedManager.length === 0 ||
      (employee.manager && selectedManager.includes(employee.manager));

    // Get the employee's role ID and check if it matches the selected role ID
    const employeeRoleId = getSkillProfileId(employee.role);
    const matchesRoleId = selectedRoleId.length === 0 || 
      (employeeRoleId && selectedRoleId.includes(employeeRoleId));

    console.log('Employee role ID match:', {
      employeeName: employee.name,
      employeeRoleId,
      selectedRoleId,
      matches: matchesRoleId
    });

    const matchesJobTitle = selectedJobTitle.length === 0 || 
      selectedJobTitle.includes(getBaseRole(employee.role));

    const matches = matchesEmployeeSearch && matchesDepartment && matchesJobTitle && 
           matchesLevel && matchesOffice && matchesEmploymentType && 
           matchesManager && matchesRoleId;

    console.log(`Employee ${employee.name} matches:`, matches);
    
    return matches;
  });
};