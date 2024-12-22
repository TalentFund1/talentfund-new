import { UnifiedSkill } from '../../../types/skillTypes';
import { skillDefinitions, getSkillByTitle, getAllSkills, getSkillsByCategory } from './universalSkillDatabase';
import { normalizeSkillTitle } from '../utils/normalization';

// Re-export everything from the universal database
export { 
  skillDefinitions,
  getSkillByTitle,
  getAllSkills,
  getSkillsByCategory 
};

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
    category: 'common',
    businessCategory: "Information Technology",
    weight: 'necessary',
    level: "beginner",
    growth: "10%",
    salary: "$0",
    confidence: "low",
    benchmarks: { B: false, R: false, M: false, O: false }
  };
};

console.log('Skill database service initialized - using universal database');