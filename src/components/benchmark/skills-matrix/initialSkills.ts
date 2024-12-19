import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { employeeSkills } from './data/employeeSkillsData';
import { initializeEmployeeSkills } from './utils/skillInitialization';
import { getAllSkills } from '../../skills/data/skills/allSkills';
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';
import { normalizeSkillTitle } from '../../skills/utils/normalization';
import { getSkillCategory } from '../../skills/data/skills/categories/skillCategories';

export const getEmployeeSkills = (employeeId: string, onlyAssigned: boolean = false): UnifiedSkill[] => {
  console.log('Getting skills for employee:', employeeId, 'Only assigned:', onlyAssigned);
  
  // Get employee's specific skills if they exist
  if (employeeSkills[employeeId]) {
    console.log('Found specific skills for employee:', {
      employeeId,
      skillCount: employeeSkills[employeeId].length
    });
    
    // Get all skills that are specifically assigned to this employee
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
        requirement: skill.requirement || 'unknown' as const
      };
    });

    // If we only want assigned skills, return just those
    if (onlyAssigned) {
      console.log('Returning only assigned skills:', {
        employeeId,
        skillCount: employeeSpecificSkills.length
      });
      return employeeSpecificSkills;
    }

    // Get all available skills
    const allSkills = getAllSkills();
    const existingSkillTitles = new Set(employeeSpecificSkills.map(s => s.title));

    // Add any missing skills with default values
    const additionalSkills = allSkills
      .filter(skill => !existingSkillTitles.has(skill.title))
      .map(skill => ({
        ...skill,
        title: normalizeSkillTitle(skill.title),
        category: getSkillCategory(skill.title),
        level: 'unspecified',
        requirement: 'unknown' as const
      }));

    const combinedSkills = [...employeeSpecificSkills, ...additionalSkills];

    console.log('Processed employee skills:', {
      employeeId,
      totalSkills: combinedSkills.length,
      specificSkills: employeeSpecificSkills.length,
      additionalSkills: additionalSkills.length
    });

    return combinedSkills;
  }
  
  // Initialize with all available skills if none exist
  console.log('No specific skills found for employee, initializing with all available skills');
  const allSkills = getAllSkills().map(skill => ({
    ...skill,
    title: normalizeSkillTitle(skill.title),
    category: getSkillCategory(skill.title),
    level: 'unspecified',
    requirement: 'unknown' as const
  }));

  console.log('Initialized employee with all skills:', {
    employeeId,
    totalSkills: allSkills.length
  });

  return allSkills;
};

// Load initial skills for an employee
export const loadEmployeeSkills = (employeeId: string, onlyAssigned: boolean = false) => {
  console.log('Loading skills for employee:', employeeId, 'Only assigned:', onlyAssigned);
  return getEmployeeSkills(employeeId, onlyAssigned);
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