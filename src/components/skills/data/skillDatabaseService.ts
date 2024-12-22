import { UnifiedSkill } from '@/types/skillTypes';
import { skillDefinitions, getSkillByTitle, generateSkillId } from './skillDefinitions';
import { getSkillCategory } from './skills/categories/skillCategories';

// Get skill data from the universal database
export const getUnifiedSkillData = (skillTitle: string): UnifiedSkill => {
  console.log('Getting unified skill data for:', skillTitle);
  
  const existingSkill = getSkillByTitle(skillTitle);

  if (existingSkill) {
    console.log('Found existing skill:', skillTitle);
    return {
      ...existingSkill,
      id: existingSkill.id || generateSkillId(skillTitle)
    };
  }

  // If skill not found, create a default entry
  console.warn('Skill not found in universal database:', skillTitle, 'creating default entry');
  return {
    id: generateSkillId(skillTitle),
    title: skillTitle,
    subcategory: 'General',
    category: getSkillCategory(skillTitle),
    weight: 'necessary',
    growth: '0%',
    confidence: 'medium',
    requirement: 'preferred',
    salary: 'N/A',
    benchmarks: { B: true, R: true, M: true, O: true }
  };
};

// Export helper functions for consistent access
export { 
  getSkillByTitle,
  getSkillCategory,
  generateSkillId,
  skillDefinitions
};