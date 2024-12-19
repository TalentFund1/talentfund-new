import { Skill } from '../types/SkillTypes';
import { Skills, getAllSkills, getSkillByTitle as getSkillFromAllSkills } from './skills/allSkills';
import { getSkillCategory } from './skills/categories/skillCategories';

export const getUnifiedSkillData = (title: string): Skill => {
  console.log('Looking up skill:', title);
  const skill = getSkillFromAllSkills(title);
  
  if (!skill) {
    console.warn(`Creating default skill for: ${title}`);
    return {
      id: `generated-${title}`,
      title,
      subcategory: 'Other',
      category: getSkillCategory(title),
      businessCategory: 'Information Technology',
      weight: 'necessary',
      level: 'beginner',
      growth: '0%',
      salary: '$0',
      confidence: 'low',
      benchmarks: { B: false, R: false, M: false, O: false }
    };
  }

  // Ensure the category is set correctly
  const category = getSkillCategory(title);
  const skillWithCategory = {
    ...skill,
    category
  };

  console.log('Found skill with category:', {
    title,
    category,
    skill: skillWithCategory
  });
  
  return skillWithCategory;
};

// Helper functions
export const getSkillsByWeight = (weight: string): Skill[] => {
  return getAllSkills().filter(skill => skill.weight === weight);
};

export const getSkillsByCategory = (category: string): Skill[] => {
  return getAllSkills().filter(skill => getSkillCategory(skill.title) === category);
};

// Add the missing function
export const addSkillToInitialSkills = (employeeId: string, skill: Skill): void => {
  console.log('Adding skill to employee:', { employeeId, skill });
  // The actual implementation will be handled by the skills database
  // This is just a pass-through function that logs the operation
};