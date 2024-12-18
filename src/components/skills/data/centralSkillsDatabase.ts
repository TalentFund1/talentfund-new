import { getSubcategory, getBusinessCategory, getSkillWeight } from './utils/categories';
import { getSkillGrowth, getSkillSalary } from './utils/metrics';
import { UnifiedSkill } from '../types/SkillTypes';

export const normalizeSkillTitle = (title: string): string => title;

export const getUnifiedSkillData = (title: string): UnifiedSkill => {
  console.log('Getting unified skill data for:', title);
  
  const subcategory = getSubcategory(title);
  const businessCategory = getBusinessCategory(title);

  return {
    id: `SKILL_${title.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`,
    title: title,
    category: subcategory.includes('Certification') ? 'certification' : 
             ['Mobile Development', 'API Development', 'Frontend Development', 'Backend Development'].includes(subcategory) ? 'specialized' : 'common',
    businessCategory: businessCategory,
    subcategory: subcategory,
    weight: getSkillWeight(title),
    level: 'unspecified',
    growth: getSkillGrowth(title),
    salary: getSkillSalary(title),
    confidence: 'medium',
    benchmarks: { B: true, R: true, M: true, O: true }
  };
};