import { UnifiedSkill } from '@/types/skillTypes';
import { skillDefinitions } from './skills/skillDefinitions';
import { normalizeSkillTitle } from '../utils/normalization';

// Core database access
export const getAllSkills = (): UnifiedSkill[] => {
  console.log('Getting all skills:', skillDefinitions.length, 'skills found');
  return skillDefinitions;
};

export const getSkillsByCategory = (category: string): UnifiedSkill[] => {
  console.log(`Getting skills for category: ${category}`);
  return skillDefinitions.filter(skill => skill.category === category);
};

export const getSkillByTitle = (title: string): UnifiedSkill | undefined => {
  console.log(`Finding skill by title: ${title}`);
  return skillDefinitions.find(
    skill => skill.title.toLowerCase() === title.toLowerCase()
  );
};

// Categorized skill access
export const Skills = {
  all: getAllSkills(),
  specialized: getSkillsByCategory('specialized'),
  common: getSkillsByCategory('common'),
  certification: getSkillsByCategory('certification')
};

// Get unified skill data with category information
export const getUnifiedSkillData = (title: string): UnifiedSkill => {
  console.log('Getting unified skill data for:', title);
  
  const normalizedTitle = normalizeSkillTitle(title);
  const existingSkill = getSkillByTitle(normalizedTitle);
  
  if (existingSkill) {
    console.log('Found existing skill:', existingSkill.title);
    return {
      ...existingSkill,
      category: existingSkill.category || 'common'
    };
  }

  // If skill not found, create a default skill entry
  console.warn(`Skill not found in universal database: ${normalizedTitle}, creating default entry`);
  return {
    id: `SKILL_${Date.now()}`,
    title: normalizedTitle,
    subcategory: "Other",
    category: 'common',
    businessCategory: "Information Technology",
    weight: "necessary",
    level: "beginner",
    growth: "10%",
    salary: "$0",
    confidence: "low",
    benchmarks: { B: false, R: false, M: false, O: false }
  };
};

// Get skill category
export const getSkillCategory = (skillTitle: string): string => {
  console.log('Getting category for skill:', skillTitle);
  const skill = getSkillByTitle(skillTitle);
  return skill?.category || 'common';
};

console.log('Skill database service initialized:', {
  totalSkills: skillDefinitions.length,
  categories: {
    specialized: getSkillsByCategory('specialized').length,
    common: getSkillsByCategory('common').length,
    certification: getSkillsByCategory('certification').length
  }
});