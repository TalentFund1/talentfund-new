import { UnifiedSkill } from '../types/SkillTypes';
import { getAllSkills, getSkillByTitle } from './skills/allSkills';
import { normalizeSkillTitle } from '../utils/normalization';
import { getSkillCategory } from './skills/categories/skillCategories';

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

  console.warn(`Skill not found in universal database: ${normalizedTitle}`);
  throw new Error(`Skill "${normalizedTitle}" not found in universal database`);
};

// Export the getAllSkills function from the source
export const getAllSkills = getAllSkillsFromSource;

// Export getSkillCategory for external use
export { getSkillCategory };

console.log('Skill database service initialized - using universal database only');