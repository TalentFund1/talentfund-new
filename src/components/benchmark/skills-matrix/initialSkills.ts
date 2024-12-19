import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { employeeSkills } from './data/employeeSkillsData';
import { initializeEmployeeSkills } from './utils/skillInitialization';
import { getAllSkills } from '../../skills/data/skills/allSkills';
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';
import { normalizeSkillTitle } from '../../skills/utils/normalization';
import { getSkillCategory } from '../../skills/data/skills/categories/skillCategories';

export const getEmployeeSkills = (employeeId: string): UnifiedSkill[] => {
  console.log('Getting skills for employee:', employeeId);
  
  // Get all available skills from the universal database
  const allSkills = getAllSkills().map(skill => {
    const normalizedTitle = normalizeSkillTitle(skill.title);
    const skillData = getUnifiedSkillData(normalizedTitle);
    console.log('Processing skill:', {
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle)
    });
    return {
      ...skillData,
      title: normalizedTitle,
      category: getSkillCategory(normalizedTitle),
      level: 'unspecified',
      requirement: 'unknown'
    };
  });
  
  console.log('Total available skills:', allSkills.length);
  
  // Return employee's specific skills if they exist
  if (employeeSkills[employeeId]) {
    console.log('Found specific skills for employee:', {
      employeeId,
      skillCount: employeeSkills[employeeId].length
    });
    
    // Merge existing skills with all skills, keeping employee's levels where they exist
    const existingSkills = new Map(employeeSkills[employeeId].map(skill => [normalizeSkillTitle(skill.title), skill]));
    
    return allSkills.map(skill => {
      const existingSkill = existingSkills.get(skill.title);
      if (existingSkill) {
        console.log('Merging existing skill data:', {
          skill: skill.title,
          level: existingSkill.level,
          requirement: existingSkill.requirement
        });
        return {
          ...skill,
          level: existingSkill.level,
          requirement: existingSkill.requirement
        };
      }
      return skill;
    });
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
