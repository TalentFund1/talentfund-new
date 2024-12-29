import { Employee } from "../types/employeeTypes";

export const filterEmployeesBySkills = (
  employees: Employee[],
  selectedSkills: ReadonlyArray<string>
): Employee[] => {
  if (selectedSkills.length === 0) return employees;

  return employees.filter(employee => {
    const employeeSkills = employee.skills.map(skill => skill.title);
    return selectedSkills.some(skill => employeeSkills.includes(skill));
  });
};