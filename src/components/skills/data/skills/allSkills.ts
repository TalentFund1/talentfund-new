import { UnifiedSkill } from '../../types/SkillTypes';
import { defineSkills } from './skillDefinitions';
import { getSkillCategory } from './categories/skillCategories';
import { getSkillWeight } from './categories/skillWeights';

// Initialize skills with categorization
const allSkills = defineSkills();

// Helper function to get all skills
export const getAllSkills = (): UnifiedSkill[] => {
  console.log('Getting all skills:', allSkills.length, 'skills found');
  return allSkills.map(skill => ({
    ...skill,
    category: getSkillCategory(skill.title),
    weight: getSkillWeight(skill.title)
  }));
};

// Helper function to get skills by category
export const getSkillsByCategory = (category: string): UnifiedSkill[] => {
  console.log(`Getting skills for category: ${category}`);
  return getAllSkills().filter(skill => getSkillCategory(skill.title) === category);
};

// Helper function to find a skill by title (case-insensitive)
export const getSkillByTitle = (title: string): UnifiedSkill | undefined => {
  console.log(`Finding skill by title: ${title}`);
  const skill = allSkills.find(skill => skill.title.toLowerCase() === title.toLowerCase());
  if (skill) {
    return {
      ...skill,
      category: getSkillCategory(skill.title),
      weight: getSkillWeight(skill.title)
    };
  }
  console.log(`Skill not found: ${title}`);
  return undefined;
};

// Export Skills object for backward compatibility
export const Skills = {
  all: getAllSkills(),
  specialized: getSkillsByCategory('specialized'),
  common: getSkillsByCategory('common'),
  certification: getSkillsByCategory('certification')
};

console.log('Skills loaded:', {
  total: allSkills.length,
  byCategory: {
    specialized: getSkillsByCategory('specialized').length,
    common: getSkillsByCategory('common').length,
    certification: getSkillsByCategory('certification').length
  }
});