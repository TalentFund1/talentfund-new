import { getSkillCategory, categorizeSkills, isSpecializedSkill, isCommonSkill, isCertificationSkill } from '../data/skills/categories/skillCategories';

// Re-export the core categorization functions that now use the universal database
export { 
  getSkillCategory,
  categorizeSkills,
  isSpecializedSkill,
  isCommonSkill,
  isCertificationSkill
};

// Additional competency-specific categorization if needed
export const categorizeSkill = (skill: string, profileId: string): 'specialized' | 'common' | 'certification' => {
  console.log('Categorizing skill for competency:', skill, 'profile:', profileId);
  return getSkillCategory(skill);
};