import { getSubcategory } from './utils/categories/subcategories';
import { getBusinessCategory } from './utils/categories/businessCategories';
import { getSkillWeight } from './utils/categories/skillWeights';
import { generateSkillId, getSkillCategory } from './utils/categories/skillLists';
import { UnifiedSkill } from '../types/SkillTypes';

export const normalizeSkillTitle = (title: string): string => title;

export const getUnifiedSkillData = (title: string): UnifiedSkill => {
  console.log('Getting unified skill data for:', title);
  
  const subcategory = getSubcategory(title);
  const businessCategory = getBusinessCategory(title);
  const category = getSkillCategory(title);
  const id = generateSkillId(title);

  console.log('Skill categorization:', {
    title,
    id,
    category,
    subcategory,
    businessCategory
  });

  return {
    id,
    title: title,
    category,
    businessCategory: businessCategory,
    subcategory: subcategory,
    weight: getSkillWeight(title),
    level: 'unspecified',
    growth: '20%',
    salary: '$150,000',
    confidence: 'medium',
    benchmarks: { B: true, R: true, M: true, O: true }
  };
};