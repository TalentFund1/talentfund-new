import { Skill } from '../types/SkillTypes';
import { Skills, getAllSkills, getSkillByTitle as getSkillFromAllSkills } from './skills/allSkills';
import { getSkillCategory } from './skills/categories/skillCategories';
import { getSkillGrowth, getSkillSalary } from './utils/metrics';

export const getUnifiedSkillData = (title: string): Skill => {
  console.log('Looking up skill:', title);
  const skill = getSkillFromAllSkills(title);
  
  if (!skill) {
    console.warn(`Creating default skill for: ${title}`);
    // Get proper growth and salary even for default skills
    const growth = getSkillGrowth(title);
    const salary = getSkillSalary(title);
    
    return {
      id: `generated-${title}`,
      title,
      subcategory: 'Other',
      category: getSkillCategory(title),
      businessCategory: 'Information Technology',
      weight: 'necessary',
      level: 'beginner',
      growth,
      salary,
      confidence: 'low',
      benchmarks: { B: false, R: false, M: false, O: false }
    };
  }

  // Ensure existing skills also have proper growth and salary
  const skillWithMetrics = {
    ...skill,
    category: getSkillCategory(title),
    growth: skill.growth || getSkillGrowth(title),
    salary: skill.salary || getSkillSalary(title)
  };

  console.log('Found skill with metrics:', {
    title,
    growth: skillWithMetrics.growth,
    salary: skillWithMetrics.salary
  });
  
  return skillWithMetrics;
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