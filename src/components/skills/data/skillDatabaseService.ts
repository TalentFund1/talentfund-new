import { UnifiedSkill } from '../../../types/skillTypes';
import { skillDefinitions, getSkillByTitle } from './skills/skillDefinitions';
import { normalizeSkillTitle } from '../utils/normalization';
import { getSkillCategory } from './skills/categories/skillCategories';

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
export const getAllSkills = (): UnifiedSkill[] => {
  return skillDefinitions;
};

export const getSkillsByCategory = (category: string): UnifiedSkill[] => {
  return skillDefinitions.filter(skill => skill.category === category);
};

console.log('Skill database service initialized - using universal database');