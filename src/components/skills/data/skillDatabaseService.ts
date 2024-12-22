import { UnifiedSkill } from '@/types/skillTypes';
import { skillDefinitions } from './skills/skillDefinitions';
import { getSkillCategory } from './skills/categories/skillCategories';

// Helper function to generate consistent skill IDs
export const generateSkillId = (title: string): string => {
  console.log('Generated new skill ID:', { 
    title, 
    id: `skill_${title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}` 
  });
  return `skill_${title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
};

// Get skill data from the universal database
export const getUnifiedSkillData = (skillTitle: string): UnifiedSkill => {
  console.log('Getting unified skill data for:', skillTitle);
  
  const existingSkill = skillDefinitions.find(
    skill => skill.title.toLowerCase() === skillTitle.toLowerCase()
  );

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