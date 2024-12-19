import { UnifiedSkill } from '../../types/SkillTypes';
import { getSkillWeight } from './categories/skillWeights';
import { getSkillCategory } from './categories/skillCategories';
import { defineSkills } from './skillDefinitions';

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

// Helper function to find a skill by ID
export const getSkillById = (id: string): UnifiedSkill | undefined => {
  console.log(`Finding skill by ID: ${id}`);
  const skill = allSkills.find(skill => skill.id === id);
  if (skill) {
    return {
      ...skill,
      category: getSkillCategory(skill.title),
      weight: getSkillWeight(skill.title)
    };
  }
  return undefined;
};

// Helper function to find a skill by title
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
  return undefined;
};

// Role-specific skill categorization helpers
export const getSpecializedSkills = (): UnifiedSkill[] => {
  return getAllSkills().filter(skill => getSkillCategory(skill.title) === 'specialized');
};

export const getCommonSkills = (): UnifiedSkill[] => {
  return getAllSkills().filter(skill => getSkillCategory(skill.title) === 'common');
};

export const getCertificationSkills = (): UnifiedSkill[] => {
  return getAllSkills().filter(skill => getSkillCategory(skill.title) === 'certification');
};

// Export Skills object for backward compatibility
export const Skills = {
  all: getAllSkills(),
  specialized: getSpecializedSkills(),
  common: getCommonSkills(),
  certification: getCertificationSkills()
};

// Export getSkillCategory for external use
export { getSkillCategory };

console.log('Skills loaded:', {
  total: allSkills.length,
  byCategory: {
    specialized: getSpecializedSkills().length,
    common: getCommonSkills().length,
    certification: getCertificationSkills().length
  },
  byWeight: {
    critical: allSkills.filter(skill => getSkillWeight(skill.title) === 'critical').length,
    technical: allSkills.filter(skill => getSkillWeight(skill.title) === 'technical').length,
    necessary: allSkills.filter(skill => getSkillWeight(skill.title) === 'necessary').length
  }
});