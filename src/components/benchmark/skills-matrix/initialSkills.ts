import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { employeeSkills } from './data/employeeSkillsData';
import { initializeEmployeeSkills } from './utils/skillInitialization';
import { getAllSkills } from '../../skills/data/skills/allSkills';
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';
import { normalizeSkillTitle } from '../../skills/utils/normalization';
import { getSkillCategory } from '../../skills/data/skills/categories/skillCategories';

// In-memory storage for employee skills added during runtime
const runtimeEmployeeSkills: { [key: string]: UnifiedSkill[] } = {};

export const addSkillToEmployee = (employeeId: string, skill: UnifiedSkill) => {
  console.log('Adding skill to employee:', {
    employeeId,
    skill: skill.title,
    currentSkills: runtimeEmployeeSkills[employeeId]?.length || 0
  });

  if (!runtimeEmployeeSkills[employeeId]) {
    runtimeEmployeeSkills[employeeId] = [];
  }

  // Check if skill already exists
  const exists = runtimeEmployeeSkills[employeeId].some(
    s => normalizeSkillTitle(s.title) === normalizeSkillTitle(skill.title)
  );

  if (!exists) {
    runtimeEmployeeSkills[employeeId].push(skill);
  }
};

export const getEmployeeSkills = (employeeId: string): UnifiedSkill[] => {
  console.log('Getting skills for employee:', employeeId);
  
  // Get initial skills from employeeSkills data
  let skills: UnifiedSkill[] = [];
  
  if (employeeSkills[employeeId]) {
    skills = employeeSkills[employeeId].map(skill => {
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
  }

  // Merge with runtime skills
  if (runtimeEmployeeSkills[employeeId]) {
    const existingTitles = new Set(skills.map(s => normalizeSkillTitle(s.title)));
    
    runtimeEmployeeSkills[employeeId].forEach(skill => {
      const normalizedTitle = normalizeSkillTitle(skill.title);
      if (!existingTitles.has(normalizedTitle)) {
        skills.push({
          ...skill,
          title: normalizedTitle,
          category: getSkillCategory(normalizedTitle)
        });
      }
    });
  }

  console.log('Retrieved employee skills:', {
    employeeId,
    totalSkills: skills.length,
    skills: skills.map(s => ({
      title: s.title,
      level: s.level,
      requirement: s.requirement
    }))
  });

  return skills;
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