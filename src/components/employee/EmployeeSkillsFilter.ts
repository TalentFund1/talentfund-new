import { Employee } from "../types/employeeTypes";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";

export const filterEmployeesBySkills = (employees: Employee[], selectedSkills: string[]): Employee[] => {
  if (selectedSkills.length === 0) return employees;

  console.log('Filtering employees by skills:', selectedSkills);

  return employees.filter(employee => {
    const employeeSkills = getEmployeeSkills(employee.id);
    console.log('Employee skills for filtering:', {
      employeeId: employee.id,
      employeeName: employee.name,
      skills: employeeSkills.map(s => s.title)
    });
    
    // Only match against skills the employee actually has
    return selectedSkills.some(selectedSkill =>
      employeeSkills.some(empSkill => 
        empSkill.title.toLowerCase().includes(selectedSkill.toLowerCase())
      )
    );
  });
};