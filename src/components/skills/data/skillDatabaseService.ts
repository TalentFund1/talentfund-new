import { UnifiedSkill } from '../types/SkillTypes';
import { skillDefinitions } from './skills/skillDefinitions';
import { normalizeSkillTitle } from '../utils/normalization';
import { getSkillCategory } from './skills/categories/skillCategories';

// Export the main functions for accessing skills
export const getAllSkills = (): UnifiedSkill[] => {
  console.log('Getting all skills:', skillDefinitions.length, 'skills found');
  return skillDefinitions;
};

export const getSkillsByCategory = (category: string): UnifiedSkill[] => {
  console.log(`Getting skills for category: ${category}`);
  return skillDefinitions.filter(skill => skill.category === category);
};

export const getSkillByTitle = (title: string): UnifiedSkill | undefined => {
  const normalizedTitle = normalizeSkillTitle(title);
  console.log(`Finding skill by title: ${normalizedTitle}`);
  return skillDefinitions.find(
    skill => normalizeSkillTitle(skill.title) === normalizedTitle
  );
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
      category: getSkillCategory(existingSkill.title)
    };
  }

  // If skill not found, create a default skill entry
  console.warn(`Skill not found in universal database: ${normalizedTitle}, creating default entry`);
  return {
    id: `SKILL_${Date.now()}`,
    title: normalizedTitle,
    subcategory: "Other",
    category: getSkillCategory(normalizedTitle),
    businessCategory: "Information Technology",
    weight: "necessary",
    level: "beginner",
    growth: "10%",
    salary: "$0",
    confidence: "low",
    benchmarks: { B: false, R: false, M: false, O: false }
  };
};

// Export helper functions
export { getSkillCategory };

console.log('Skill database service initialized with universal database');