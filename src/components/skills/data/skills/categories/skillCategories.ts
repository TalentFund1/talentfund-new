import { Skills, getAllSkills } from '../allSkills';
import { UnifiedSkill } from '../../../types/SkillTypes';
import { normalizeSkillTitle } from '../../../utils/normalization';

// Single source of truth for skill categories
const universalSkillsDatabase = getAllSkills();

export type SkillCategory = 'specialized' | 'common' | 'certification';

export const getSkillCategory = (skillTitle: string): SkillCategory => {
  console.log('Getting category for skill from universal database:', skillTitle);
  
  const normalizedTitle = normalizeSkillTitle(skillTitle);
  const skill = universalSkillsDatabase.find(
    s => normalizeSkillTitle(s.title) === normalizedTitle
  );

  if (!skill) {
    console.warn('Skill not found in universal database:', skillTitle);
    return 'common'; // Default fallback
  }

  console.log('Found skill category:', {
    skill: skillTitle,
    category: skill.category
  });

  return skill.category;
};

// Helper functions that now use the universal database
export const isSpecializedSkill = (skillTitle: string): boolean => {
  return getSkillCategory(skillTitle) === 'specialized';
};

export const isCommonSkill = (skillTitle: string): boolean => {
  return getSkillCategory(skillTitle) === 'common';
};

export const isCertificationSkill = (skillTitle: string): boolean => {
  return getSkillCategory(skillTitle) === 'certification';
};

export const categorizeSkills = (skills: string[]) => {
  console.log('Categorizing skills using universal database');
  
  const categories = skills.reduce((acc, skill) => {
    const category = getSkillCategory(skill);
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<SkillCategory, number>);

  console.log('Categorization results:', categories);

  return {
    all: skills.length,
    specialized: categories.specialized || 0,
    common: categories.common || 0,
    certification: categories.certification || 0
  };
};

// Export the universal database for direct access
export const getUniversalSkillsDatabase = (): UnifiedSkill[] => {
  return universalSkillsDatabase;
};