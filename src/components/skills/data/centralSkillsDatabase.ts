import { getSubcategory } from './utils/categories/subcategories';
import { getBusinessCategory } from './utils/categories/businessCategories';
import { getSkillWeight } from './utils/categories/skillWeights';
import { generateSkillId, getSkillCategory } from './utils/categories/skillLists';
import { UnifiedSkill } from '../types/SkillTypes';

export const normalizeSkillTitle = (title: string): string => {
  // Normalize certification variations
  if (title.toLowerCase().includes('certification') || 
      title.toLowerCase().includes('certificate')) {
    return title.replace(/certificate/i, 'Certification')
               .replace(/certified/i, 'Certification');
  }
  return title;
};

export const getUnifiedSkillData = (title: string): UnifiedSkill => {
  console.log('Getting unified skill data for:', title);
  
  const normalizedTitle = normalizeSkillTitle(title);
  const subcategory = getSubcategory(normalizedTitle);
  const businessCategory = getBusinessCategory(normalizedTitle);
  const category = getSkillCategory(normalizedTitle);
  const id = generateSkillId(normalizedTitle);

  console.log('Skill categorization:', {
    originalTitle: title,
    normalizedTitle,
    id,
    category,
    subcategory,
    businessCategory
  });

  return {
    id,
    title: normalizedTitle,
    category,
    businessCategory: businessCategory,
    subcategory: subcategory,
    weight: getSkillWeight(normalizedTitle),
    level: 'unspecified',
    growth: '20%',
    salary: '$150,000',
    confidence: 'medium',
    benchmarks: { B: true, R: true, M: true, O: true }
  };
};