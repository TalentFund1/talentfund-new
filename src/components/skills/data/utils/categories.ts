import { SkillWeight } from '../../types/SkillTypes';
import { specializedSkills, commonSkills, certificationSkills } from './categories/skillLists';
import { getSubcategory } from './categories/subcategories';
import { getBusinessCategory } from './categories/businessCategories';
import { getSkillWeight } from './categories/skillWeights';

export const getSkillCategory = (skillTitle: string): string => {
  console.log(`Categorizing skill: ${skillTitle}`);
  
  if (specializedSkills.includes(skillTitle)) {
    console.log(`${skillTitle} categorized as specialized`);
    return 'specialized';
  }
  if (commonSkills.includes(skillTitle)) {
    console.log(`${skillTitle} categorized as common`);
    return 'common';
  }
  if (certificationSkills.includes(skillTitle)) {
    console.log(`${skillTitle} categorized as certification`);
    return 'certification';
  }
  
  // If not found in any list, determine category based on name pattern
  if (skillTitle.toLowerCase().includes('certification') || 
      skillTitle.toLowerCase().includes('certified') ||
      skillTitle.toLowerCase().includes('certificate')) {
    console.log(`${skillTitle} auto-categorized as certification based on name`);
    return 'certification';
  }
  
  console.log(`${skillTitle} defaulting to common category`);
  return 'common';
};

export {
  getSubcategory,
  getBusinessCategory,
  getSkillWeight
};