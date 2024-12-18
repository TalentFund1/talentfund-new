import { Skill } from '../types/SkillTypes';
import { Skills, getAllSkills, getSkillByTitle as getSkillFromAllSkills } from './skills/allSkills';

export const getUnifiedSkillData = (title: string): Skill => {
  const skill = getSkillFromAllSkills(title);
  if (!skill) {
    console.warn(`Skill not found in database: ${title}`);
    return {
      id: `generated-${title}`,
      title,
      subcategory: 'Other',
      category: 'common',
      businessCategory: 'Information Technology',
      weight: 'necessary',
      level: 'beginner',
      growth: '0%',
      salary: '$0',
      confidence: 'low',
      benchmarks: { B: false, R: false, M: false, O: false }
    };
  }
  return skill;
};

// Helper functions
export const getSkillsByWeight = (weight: string): Skill[] => {
  return getAllSkills().filter(skill => skill.weight === weight);
};

export const getSkillsByCategory = (category: string): Skill[] => {
  return getAllSkills().filter(skill => skill.category === category);
};

// Add the missing function
export const addSkillToInitialSkills = (employeeId: string, skill: Skill): void => {
  console.log('Adding skill to employee:', { employeeId, skill });
  // The actual implementation will be handled by the skills database
  // This is just a pass-through function that logs the operation
};