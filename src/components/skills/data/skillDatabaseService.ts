import { UnifiedSkill } from '@/types/skillTypes';
import { getSkillByTitle } from './skills/allSkills';
import { normalizeSkillTitle } from '../utils/normalization';
import { getSkillCategory } from './skills/categories/skillCategories';
import { skillDefinitions } from './skillDefinitions';

// Helper function to generate consistent skill IDs
export const generateSkillId = (title: string): string => {
  const normalizedTitle = normalizeSkillTitle(title);
  // First try to find existing skill in universal database
  const existingSkill = skillDefinitions.find(
    skill => normalizeSkillTitle(skill.title) === normalizedTitle
  );
  
  if (existingSkill?.id) {
    console.log('Found existing skill ID:', { title, id: existingSkill.id });
    return existingSkill.id;
  }

  // If not found, generate a consistent ID based on the normalized title
  const id = `skill_${normalizedTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
  console.log('Generated new skill ID:', { title, id });
  return id;
};

// Get unified skill data
export const getUnifiedSkillData = (title: string): UnifiedSkill => {
  console.log('Getting unified skill data for:', title);
  
  const normalizedTitle = normalizeSkillTitle(title);
  const existingSkill = getSkillByTitle(normalizedTitle);
  
  if (existingSkill) {
    console.log('Found existing skill:', existingSkill.title);
    return {
      ...existingSkill,
      id: generateSkillId(existingSkill.title),
      category: getSkillCategory(existingSkill.title)
    };
  }

  // If skill not found, create a default skill entry with consistent ID
  console.warn(`Skill not found in universal database: ${normalizedTitle}, creating default entry`);
  return {
    id: generateSkillId(normalizedTitle),
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

console.log('Skill database service initialized - using universal database for ID generation');