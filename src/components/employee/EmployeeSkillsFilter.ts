import { Employee } from "../types/employeeTypes";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";

export const filterEmployeesBySkills = (employees: Employee[], selectedSkills: string[]): Employee[] => {
  if (selectedSkills.length === 0) return employees;

  console.log('Filtering employees by skills:', {
    initialEmployeeCount: employees.length,
    selectedSkills
  });

  const filteredEmployees = employees.filter(employee => {
    const employeeSkills = getEmployeeSkills(employee.id);
    // Changed from every to some to match any skill instead of all skills
    const hasMatchingSkills = selectedSkills.some(selectedSkill =>
      employeeSkills.some(empSkill => 
        empSkill.title.toLowerCase().includes(selectedSkill.toLowerCase())
      )
    );

    console.log(`Employee ${employee.name} skills match:`, hasMatchingSkills);
    return hasMatchingSkills;
  });

  console.log('Filtered employees result:', {
    finalEmployeeCount: filteredEmployees.length,
    filteredEmployees: filteredEmployees.map(e => e.name)
  });

  return filteredEmployees;
};