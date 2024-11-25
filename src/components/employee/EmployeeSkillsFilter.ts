import { Employee } from "../types/employeeTypes";
import { getEmployeeSkills } from "../benchmark/skills-matrix/initialSkills";

export const filterEmployeesBySkills = (employees: Employee[], selectedSkills: string[]): Employee[] => {
  if (selectedSkills.length === 0) return employees;

  console.log('Filtering employees by skills:', selectedSkills);

  return employees.filter(employee => {
    const employeeSkills = getEmployeeSkills(employee.id);
    console.log(`Checking skills for employee ${employee.name}:`, employeeSkills);

    // Count how many of the selected skills the employee has
    const matchingSkills = selectedSkills.filter(selectedSkill =>
      employeeSkills.some(empSkill => 
        empSkill.title.toLowerCase() === selectedSkill.toLowerCase()
      )
    );

    console.log(`Matching skills for ${employee.name}:`, matchingSkills);
    
    // Employee should have at least one of the selected skills
    return matchingSkills.length > 0;
  });
};