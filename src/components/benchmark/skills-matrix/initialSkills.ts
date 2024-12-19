import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { employeeSkills } from './data/employeeSkillsData';
import { initializeEmployeeSkills } from './utils/skillInitialization';

export const getEmployeeSkills = (employeeId: string): UnifiedSkill[] => {
  console.log('Getting skills for employee:', employeeId);
  
  // Return only employee's specific skills if they exist
  if (employeeSkills[employeeId]) {
    console.log('Found specific skills for employee:', {
      employeeId,
      skillCount: employeeSkills[employeeId].length,
      skills: employeeSkills[employeeId].map(skill => skill.title)
    });
    return employeeSkills[employeeId];
  }
  
  // Initialize with empty skills if none exist
  console.log('No specific skills found for employee, initializing empty skills');
  return [];
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