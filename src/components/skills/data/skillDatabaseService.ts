import { UnifiedSkill } from '../types/SkillTypes';
import { Skills, getAllSkills as getAllSkillsFromSource, getSkillByTitle } from './skills/allSkills';
import { normalizeSkillTitle } from '../utils/normalization';
import { getSkillCategory } from './skills/categories/skillCategories';
import { getEmployeeSkills } from '../../benchmark/skills-matrix/initialSkills';

// Get unified skill data
export const getUnifiedSkillData = (title: string): UnifiedSkill => {
  console.log('Getting unified skill data for:', title);
  
  const normalizedTitle = normalizeSkillTitle(title);
  const existingSkill = getSkillByTitle(normalizedTitle);
  
  if (existingSkill) {
    console.log('Found existing skill:', existingSkill.title);
    return {
      ...existingSkill,
      category: getSkillCategory(existingSkill.title)
    };
  }

  // If skill not found, create a new one with default values
  const newSkill: UnifiedSkill = {
    id: `SKILL${Math.random().toString(36).substr(2, 9)}`,
    title: normalizedTitle,
    category: getSkillCategory(normalizedTitle),
    businessCategory: 'Information Technology',
    subcategory: 'General',
    weight: 'necessary',
    level: 'unspecified',
    growth: '20%',
    salary: '$150,000',
    confidence: 'medium',
    benchmarks: { 
      B: true, 
      R: true, 
      M: true, 
      O: true 
    }
  };

  console.log('Created new skill entry:', newSkill.title);
  return newSkill;
};

// Add skill to initial skills
export const addSkillToInitialSkills = (roleId: string, skill: UnifiedSkill) => {
  console.log('Adding skill to initial skills:', {
    roleId,
    skill: skill.title
  });

  // Get the role's skills from initialSkills
  const employeeSkills = getEmployeeSkills(roleId);

  // Check if skill already exists
  const skillExists = employeeSkills.some(s => s.title === skill.title);
  if (!skillExists) {
    employeeSkills.push(skill);
    console.log('Skill added successfully to initial skills');
  } else {
    console.log('Skill already exists in initial skills');
  }
};

// Export the getAllSkills function from the source
export const getAllSkills = getAllSkillsFromSource;

// Export getSkillCategory for external use
export { getSkillCategory };

console.log('Skill database service initialized');