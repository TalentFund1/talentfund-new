import { Employee } from "../types/employeeTypes";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";

export const filterEmployeesBySkills = (employees: Employee[], selectedSkills: string[]): Employee[] => {
  if (selectedSkills.length === 0) return employees;

  return employees.filter(employee => {
    const employeeSkills = getEmployeeSkills(employee.id);
    // Changed from every to some to match any skill instead of all skills
    return selectedSkills.some(selectedSkill =>
      employeeSkills.some(empSkill => 
        empSkill.title.toLowerCase().includes(selectedSkill.toLowerCase())
      )
    );
  });
};