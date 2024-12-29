import { Employee } from "../types/employeeTypes";

export const filterEmployees = (
  employees: ReadonlyArray<Employee>,
  selectedEmployees: ReadonlyArray<string>,
  selectedDepartment: ReadonlyArray<string>,
  selectedLevel: ReadonlyArray<string>,
  selectedOffice: ReadonlyArray<string>,
  selectedEmploymentType: ReadonlyArray<string>,
  selectedSkills: ReadonlyArray<string>,
  selectedManager: ReadonlyArray<string>
): Employee[] => {
  console.log('Filtering employees with params:', {
    totalEmployees: employees.length,
    selectedEmployees,
    selectedDepartment,
    selectedLevel,
    selectedOffice,
    selectedEmploymentType,
    selectedSkills,
    selectedManager
  });

  return employees.filter(employee => {
    const isSelected = selectedEmployees.length === 0 || selectedEmployees.includes(employee.id);
    const isInDepartment = selectedDepartment.length === 0 || selectedDepartment.includes(employee.department);
    const isInLevel = selectedLevel.length === 0 || selectedLevel.includes(employee.role.split(':')[1]?.trim());
    const isInOffice = selectedOffice.length === 0 || selectedOffice.includes(employee.location.split(',')[0].trim());
    const isInEmploymentType = selectedEmploymentType.length === 0 || selectedEmploymentType.includes(employee.category);
    
    // Safely check skills with null check
    const isInSkills = selectedSkills.length === 0 || (
      Array.isArray(employee.skills) && 
      selectedSkills.some(skill => 
        employee.skills.some(empSkill => empSkill.title === skill)
      )
    );
    
    const isInManager = selectedManager.length === 0 || selectedManager.includes(employee.manager || '');

    const result = isSelected && isInDepartment && isInLevel && 
                  isInOffice && isInEmploymentType && isInSkills && 
                  isInManager;

    console.log('Employee filter result:', {
      employeeId: employee.id,
      name: employee.name,
      hasSkills: Array.isArray(employee.skills),
      skillCount: employee.skills?.length || 0,
      matchesFilters: result
    });

    return result;
  });
};