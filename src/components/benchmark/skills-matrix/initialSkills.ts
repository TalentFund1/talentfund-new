import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { employeeSkills } from './data/employeeSkillsData';
import { initializeEmployeeSkills } from './utils/skillInitialization';
import { getAllSkills } from '../../skills/data/skills/allSkills';
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';
import { normalizeSkillTitle } from '../../skills/utils/normalization';
import { getSkillCategory } from '../../skills/data/skills/categories/skillCategories';

export const getEmployeeSkills = (employeeId: string): UnifiedSkill[] => {
  console.log('Getting skills for employee:', employeeId);
  
  // Get employee's specific skills if they exist
  if (employeeSkills[employeeId]) {
    console.log('Found specific skills for employee:', {
      employeeId,
      skillCount: employeeSkills[employeeId].length
    });
    
    // Only use skills that are specifically assigned to this employee
    const employeeSpecificSkills = employeeSkills[employeeId].map(skill => {
      const normalizedTitle = normalizeSkillTitle(skill.title);
      const skillData = getUnifiedSkillData(normalizedTitle);
      console.log('Processing employee skill:', {
        title: normalizedTitle,
        category: getSkillCategory(normalizedTitle)
      });
      return {
        ...skillData,
        title: normalizedTitle,
        category: getSkillCategory(normalizedTitle),
        level: skill.level || 'unspecified',
        requirement: skill.requirement || 'unknown'
      };
    });

    console.log('Processed employee skills:', {
      employeeId,
      totalSkills: employeeSpecificSkills.length,
      skills: employeeSpecificSkills.map(s => ({
        title: s.title,
        level: s.level,
        requirement: s.requirement
      }))
    });

    return employeeSpecificSkills;
  }
  
  // Initialize with empty skills if none exist
  console.log('No specific skills found for employee, initializing empty skills array');
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