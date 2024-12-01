import { Employee } from "../types/employeeTypes";
import { categorizeSkills } from "../skills/competency/skillCategories";
import { getBaseRole } from '@/utils/roleUtils';

export const filterEmployees = (
  employees: Employee[],
  searchedEmployees: string[],
  selectedDepartment: string[],
  selectedJobTitle: string[],
  selectedLevel: string[],
  selectedOffice: string[],
  selectedEmploymentType: string[],
  selectedSkills: string[]
): Employee[] => {
  return employees.filter(employee => {
    const matchesEmployeeSearch = searchedEmployees.length === 0 || 
      searchedEmployees.includes(employee.name);

    const matchesDepartment = selectedDepartment.length === 0 || 
      selectedDepartment.includes(employee.department);
    
    const matchesJobTitle = selectedJobTitle.length === 0 || 
      selectedJobTitle.includes(getBaseRole(employee.role));
    
    const matchesLevel = selectedLevel.length === 0 || 
      selectedLevel.includes(getLevel(employee.role));

    const matchesOffice = selectedOffice.length === 0 || 
      selectedOffice.includes(employee.location.split(',')[0].trim());

    const matchesEmploymentType = selectedEmploymentType.length === 0 ||
      selectedEmploymentType.includes(employee.category);

    return matchesEmployeeSearch && matchesDepartment && matchesJobTitle && 
           matchesLevel && matchesOffice && matchesEmploymentType;
  });
};

export const processEmployeeSkills = (skills: string, role: string) => {
  // Convert comma-separated string to array and clean up
  const skillsList = skills
    .split(',')
    .map(skill => skill.trim())
    .filter(skill => skill.length > 0);

  // Get role ID for categorization
  const roleId = getSkillProfileId(role);
  
  // Categorize skills
  const categorizedSkills = categorizeSkills(skillsList, roleId);

  return {
    skillsList,
    categorizedSkills
  };
};
