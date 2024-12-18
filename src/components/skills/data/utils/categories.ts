import { SkillWeight } from '../../types/SkillTypes';
import { specializedSkills, commonSkills, certificationSkills } from './categories/skillLists';
import { getSubcategory } from './categories/subcategories';
import { getBusinessCategory } from './categories/businessCategories';
import { getSkillWeight } from './categories/skillWeights';

export const getSkillCategory = (skillTitle: string): string => {
  console.log(`Categorizing skill: ${skillTitle}`);
  
  // First check if it's in our predefined lists
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
  
  // If not found in lists, determine category based on name patterns
  const lowerTitle = skillTitle.toLowerCase();
  if (lowerTitle.includes('certification') || 
      lowerTitle.includes('certified') ||
      lowerTitle.includes('certificate')) {
    console.log(`${skillTitle} auto-categorized as certification based on name`);
    return 'certification';
  }
  
  // Check for specialized skill patterns
  if (lowerTitle.includes('aws') ||
      lowerTitle.includes('cloud') ||
      lowerTitle.includes('ai') ||
      lowerTitle.includes('ml') ||
      lowerTitle.includes('architecture') ||
      lowerTitle.includes('design') ||
      lowerTitle.includes('development')) {
    console.log(`${skillTitle} auto-categorized as specialized based on keywords`);
    return 'specialized';
  }
  
  console.log(`${skillTitle} defaulting to common category`);
  return 'common';
};

export {
  getSubcategory,
  getBusinessCategory,
  getSkillWeight
};