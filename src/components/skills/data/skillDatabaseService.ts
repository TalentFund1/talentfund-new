import { UnifiedSkill } from '../types/SkillTypes';
import { normalizeSkillTitle } from '../utils/normalization';
import { managementSkills } from './categories/managementSkills';
import { aiSkills } from './categories/aiSkills';
import { webSkills } from './categories/webSkills';
import { devopsSkills } from './categories/devopsSkills';

// Combine all skills into one central database
const allSkills = [
  ...managementSkills,
  ...aiSkills,
  ...webSkills,
  ...devopsSkills
].map(skill => ({
  ...skill,
  title: normalizeSkillTitle(skill.title)
}));

// Get unified skill data
export const getUnifiedSkillData = (title: string): UnifiedSkill => {
  console.log('Getting unified skill data for:', title);
  
  const normalizedTitle = normalizeSkillTitle(title);
  const existingSkill = allSkills.find(skill => 
    normalizeSkillTitle(skill.title) === normalizedTitle
  );
  
  if (existingSkill) {
    console.log('Found existing skill:', existingSkill.title, 'with category:', existingSkill.category);
    return {
      ...existingSkill,
      requirement: 'preferred' as const,
      isCompanySkill: true
    };
  }

  console.log('Creating new skill entry for:', normalizedTitle);
  // If skill not found, create a new one with default values
  const newSkill: UnifiedSkill = {
    id: `SKILL${Math.random().toString(36).substr(2, 9)}`,
    title: normalizedTitle,
    category: 'common',
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
    },
    requirement: 'preferred',
    isCompanySkill: true
  };

  console.log('Created new skill entry:', newSkill.title, 'with category:', newSkill.category);
  return newSkill;
};

// Export additional utility functions
export const getAllUnifiedSkills = (): UnifiedSkill[] => {
  return allSkills;
};

export const getSkillsByCategory = (category: string): UnifiedSkill[] => {
  return allSkills.filter(skill => skill.category === category);
};

// Helper function to get skill category
export const getSkillCategory = (skillTitle: string): 'specialized' | 'common' | 'certification' => {
  const skill = getUnifiedSkillData(skillTitle);
  return skill.category;
};

console.log('Skill database service initialized with', allSkills.length, 'skills');