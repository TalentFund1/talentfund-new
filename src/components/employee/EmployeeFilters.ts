import { Employee } from "../types/employeeTypes";
import { getSkillProfileId } from "../EmployeeTable";
import { calculateBenchmarkPercentage } from "./BenchmarkCalculator";

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
    
    // Match only by exact role ID or benchmark percentage
    const matchesJobTitle = selectedJobTitle.length === 0 || 
      selectedJobTitle.some(title => {
        const titleRoleId = getSkillProfileId(title);
        const employeeRoleId = getSkillProfileId(employee.role);
        
        // First check exact role ID match
        if (titleRoleId === employeeRoleId) {
          console.log('Exact role match found:', {
            employee: employee.name,
            employeeRole: employee.role,
            employeeRoleId,
            selectedTitle: title,
            titleRoleId
          });
          return true;
        }
        
        // If no exact match, check benchmark percentage
        const benchmark = employee.benchmark;
        const isPartialMatch = benchmark > 0;
        
        console.log('Role matching result:', {
          employee: employee.name,
          employeeRole: employee.role,
          selectedTitle: title,
          benchmark,
          isPartialMatch
        });
        
        return isPartialMatch;
      });
    
    const matchesLevel = selectedLevel.length === 0 || 
      selectedLevel.includes(employee.role.split(':')[1]?.trim());

    const matchesOffice = selectedOffice.length === 0 || 
      selectedOffice.includes(employee.location.split(',')[0].trim());

    const matchesEmploymentType = selectedEmploymentType.length === 0 ||
      selectedEmploymentType.includes(employee.category);

    const matchesManager = selectedManager.length === 0 ||
      (employee.manager && selectedManager.includes(employee.manager));

    const matches = matchesEmployeeSearch && matchesDepartment && matchesJobTitle && 
           matchesLevel && matchesOffice && matchesEmploymentType && matchesManager;

    console.log(`Employee ${employee.name} matches filters:`, matches);

    return matches;
  });
};