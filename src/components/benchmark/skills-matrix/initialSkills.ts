import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { employeeSkills } from './data/employeeSkillsData';
import { initializeEmployeeSkills } from './utils/skillInitialization';
import { getAllSkills } from '../../skills/data/skills/allSkills';

export const getEmployeeSkills = (employeeId: string): UnifiedSkill[] => {
  console.log('Getting skills for employee:', employeeId);
  
  // Get all available skills from the universal database
  const allSkills = getAllSkills();
  console.log('Total available skills:', allSkills.length);
  
  // Return employee's specific skills if they exist, otherwise return all skills
  if (employeeSkills[employeeId]) {
    console.log('Found specific skills for employee:', {
      employeeId,
      skillCount: employeeSkills[employeeId].length
    });
    return employeeSkills[employeeId];
  }
  
  // Initialize with all skills if none exist
  console.log('No specific skills found for employee, initializing with all skills');
  return initializeEmployeeSkills(employeeId, allSkills);
};

// Load initial skills for an employee
export const loadEmployeeSkills = (employeeId: string) => {
  console.log('Loading skills for employee:', employeeId);
  return getEmployeeSkills(employeeId);
};

// Export the loaded skills for verification
console.log('Loaded employee skills:', 
  Object.entries(employeeSkills).map(([id, skills]) => ({
    employeeId: id,
    skillCount: skills.length,
    skills: skills.map(s => ({
      title: s.title,
      category: s.category
    }))
  }))
);