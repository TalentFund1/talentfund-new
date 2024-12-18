import { UnifiedSkill } from '../types/SkillTypes';
import { getAllSkills, getSkillById, getSkillByTitle, getSkillCategory } from './skills/allSkills';
import { normalizeSkillTitle } from '../utils/normalization';

// Get unified skill data
export const getUnifiedSkillData = (title: string): UnifiedSkill => {
  console.log('Getting unified skill data for:', title);
  
  const normalizedTitle = normalizeSkillTitle(title);
  const existingSkill = getSkillByTitle(normalizedTitle);
  
  if (existingSkill) {
    console.log('Found existing skill:', existingSkill.title);
    return {
      ...existingSkill,
      category: getSkillCategory(existingSkill.title)
    };
  }

  // If skill not found, create a new one with default values
  const newSkill: UnifiedSkill = {
    id: `SKILL${Math.random().toString(36).substr(2, 9)}`,
    title: normalizedTitle,
    category: getSkillCategory(normalizedTitle),
    businessCategory: 'Information Technology',
    subcategory: 'General',
    weight: 'necessary',
    level: 'unspecified',
    growth: '20%',
    salary: '$150,000',
    confidence: 'medium',
    benchmarks: { 
      B: true, 
      R: true, 
      M: true, 
      O: true 
    }
  };

  console.log('Created new skill entry:', newSkill.title);
  return newSkill;
};

// Export additional utility functions
export { getAllSkills, getSkillCategory };

export const getSkillsByWeight = (weight: string): UnifiedSkill[] => {
  return getAllSkills().filter(skill => skill.weight === weight);
};

console.log('Skill database service initialized');