import { UnifiedSkill } from '../types/skillTypes';
import { getSkillByTitle, getSkillCategory } from './skillDefinitions';
import { normalizeSkillTitle } from '../utils/normalization';

// Get unified skill data
export const getUnifiedSkillData = (title: string): UnifiedSkill => {
  console.log('Getting unified skill data for:', title);
  
  const normalizedTitle = normalizeSkillTitle(title);
  const existingSkill = getSkillByTitle(normalizedTitle);
  
  if (existingSkill) {
    console.log('Found existing skill:', existingSkill.title);
    return existingSkill;
  }

  // If skill not found, create a default skill entry
  console.warn(`Skill not found in universal database: ${normalizedTitle}, creating default entry`);
  return {
    id: `SKILL_${Date.now()}`,
    title: normalizedTitle,
    subcategory: "Other",
    category: 'common', // Default to common for unknown skills
    businessCategory: "Information Technology",
    weight: "necessary",
    level: "beginner",
    growth: "10%",
    salary: "$0",
    confidence: "low",
    benchmarks: { B: false, R: false, M: false, O: false }
  };
};

// Export getSkillCategory for external use
export { getSkillCategory };

console.log('Skill database service initialized - using universal database only');