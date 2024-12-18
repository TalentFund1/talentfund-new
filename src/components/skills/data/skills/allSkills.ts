import { UnifiedSkill } from '../../types/SkillTypes';
import { getSkillWeight } from './categories/skillWeights';
import { defineSkills } from './skillDefinitions';
import { initializeSkillsDatabase } from './categories/skillCategories';

// Initialize skills
const allSkills = defineSkills();

// Helper function to get all skills
export const getAllSkills = (): UnifiedSkill[] => {
  console.log('Getting all skills:', allSkills.length, 'skills found');
  const skills = allSkills.map(skill => ({
    ...skill,
    weight: getSkillWeight(skill.title)
  }));

  // Initialize the universal database
  initializeSkillsDatabase(skills);

  return skills;
};

// Helper function to get skills by category
export const getSkillsByCategory = (category: string): UnifiedSkill[] => {
  console.log(`Getting skills for category: ${category}`);
  return getAllSkills().filter(skill => skill.category === category);
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
  return getAllSkills().filter(skill => skill.category === 'specialized');
};

export const getCommonSkills = (): UnifiedSkill[] => {
  return getAllSkills().filter(skill => skill.category === 'common');
};

export const getCertificationSkills = (): UnifiedSkill[] => {
  return getAllSkills().filter(skill => skill.category === 'certification');
};

// Export Skills object for backward compatibility
export const Skills = {
  all: getAllSkills(),
  specialized: getSpecializedSkills(),
  common: getCommonSkills(),
  certification: getCertificationSkills()
};

console.log('Skills loaded:', {
  total: allSkills.length,
  byCategory: {
    specialized: Skills.specialized.length,
    common: Skills.common.length,
    certification: Skills.certification.length
  }
});
