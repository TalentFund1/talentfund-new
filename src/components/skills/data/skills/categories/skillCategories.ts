import { SkillCategory } from '../../../types/SkillTypes';
import { skillDefinitions } from '../skillDefinitions';

const skillDefinitionMap = new Map(
  skillDefinitions.map(skill => [skill.title.toLowerCase(), skill])
);

export const getSkillCategory = (skillTitle: string): SkillCategory => {
  console.log('Getting category for skill:', skillTitle);
  const skill = skillDefinitionMap.get(skillTitle.toLowerCase());
  return skill?.category || 'common';
};

// Helper function to check if a skill belongs to a specific category
export const isSkillInCategory = (skillTitle: string, category: SkillCategory): boolean => {
  return getSkillCategory(skillTitle) === category;
};

// Specific helper functions for each category
export const isSpecializedSkill = (skillTitle: string): boolean => {
  return isSkillInCategory(skillTitle, 'specialized');
};

export const isCommonSkill = (skillTitle: string): boolean => {
  return isSkillInCategory(skillTitle, 'common');
};

export const isCertificationSkill = (skillTitle: string): boolean => {
  return isSkillInCategory(skillTitle, 'certification');
};

// Function to get all skills of a specific category
export const getSkillsByCategory = (category: SkillCategory): string[] => {
  return skillDefinitions
    .filter(skill => skill.category === category)
    .map(skill => skill.title);
};