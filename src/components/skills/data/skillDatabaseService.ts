import { UnifiedSkill, SkillCategory } from '@/types/skillTypes';
import { skillDefinitions } from './skills/skillDefinitions';
import { getSkillCategory } from './skills/categories/skillCategories';

// Helper function to generate consistent skill IDs
export const generateSkillId = (title: string): string => {
  const normalizedTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '_');
  const id = `skill_${normalizedTitle}`;
  console.log('Generated skill ID:', { title, id });
  return id;
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
      id: existingSkill.id || generateSkillId(skillTitle),
      category: getSkillCategory(skillTitle)
    };
  }

  // If skill not found, create a default entry
  console.warn('Skill not found in universal database:', skillTitle);
  return {
    id: generateSkillId(skillTitle),
    title: skillTitle,
    subcategory: 'General',
    category: getSkillCategory(skillTitle),
    weight: 'necessary',
    level: 'unspecified',
    growth: '0%',
    confidence: 'medium',
    requirement: 'preferred',
    salary: 'N/A',
    benchmarks: { B: true, R: true, M: true, O: true }
  };
};

// Get all skills from the universal database
export const getAllSkills = (): UnifiedSkill[] => {
  return skillDefinitions.map(skill => ({
    ...skill,
    id: skill.id || generateSkillId(skill.title),
    category: getSkillCategory(skill.title)
  }));
};

// Get skills by category
export const getSkillsByCategory = (category: SkillCategory): UnifiedSkill[] => {
  return getAllSkills().filter(skill => getSkillCategory(skill.title) === category);
};

console.log('Skill database service initialized');