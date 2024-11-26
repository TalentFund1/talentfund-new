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
    // Get employee's role ID first and check if it matches
    const employeeRoleId = getSkillProfileId(employee.role);
    
    console.log(`Filtering employee ${employee.name}:`, {
      employeeRoleId,
      selectedRoleId,
      roleMatch: selectedRoleId.length === 0 || selectedRoleId.includes(employeeRoleId)
    });

    // If role ID is selected and doesn't match, exclude the employee immediately
    if (selectedRoleId.length > 0 && !selectedRoleId.includes(employeeRoleId)) {
      console.log(`Excluding ${employee.name} due to role ID mismatch`);
      return false;
    }

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
           matchesLevel && matchesOffice && matchesEmploymentType && 
           matchesManager;

    console.log(`Final match result for ${employee.name}:`, {
      matches,
      criteria: {
        employeeSearch: matchesEmployeeSearch,
        department: matchesDepartment,
        jobTitle: matchesJobTitle,
        level: matchesLevel,
        office: matchesOffice,
        employmentType: matchesEmploymentType,
        manager: matchesManager
      }
    });
    
    return matches;
  });
};