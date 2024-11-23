import { Employee } from "../types/employeeTypes";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";

export const filterEmployeesBySkills = (employees: Employee[], selectedSkills: string[]): Employee[] => {
  if (selectedSkills.length === 0) return employees;

  return employees.filter(employee => {
    const employeeSkills = getEmployeeSkills(employee.id);
    return selectedSkills.every(selectedSkill =>
      employeeSkills.some(empSkill => 
        empSkill.title.toLowerCase().includes(selectedSkill.toLowerCase())
      )
    );
  });
};