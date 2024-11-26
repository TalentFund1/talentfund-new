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
  console.log('Starting employee filtering with criteria:', {
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
    // Get employee's role ID first
    const employeeRoleId = getSkillProfileId(employee.role);
    
    console.log(`Checking employee ${employee.name}:`, {
      employeeRoleId,
      selectedRoleId,
      roleMatch: selectedRoleId.length === 0 || selectedRoleId.includes(employeeRoleId)
    });

    // If role ID is selected, it takes precedence - return false immediately if no match
    if (selectedRoleId.length > 0 && !selectedRoleId.includes(employeeRoleId)) {
      return false;
    }

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

    const matchesJobTitle = selectedJobTitle.length === 0 || 
      selectedJobTitle.includes(getBaseRole(employee.role));

    const matches = matchesEmployeeSearch && matchesDepartment && matchesJobTitle && 
           matchesLevel && matchesOffice && matchesEmploymentType && 
           matchesManager;

    console.log(`Final match result for ${employee.name}:`, matches);
    
    return matches;
  });
};