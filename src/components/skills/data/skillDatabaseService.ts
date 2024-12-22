import { UnifiedSkill, SkillCategory, SkillWeight, SkillLevel } from '@/types/skillTypes';
import { skillDefinitions } from './skillDefinitions';
import { getSkillCategory } from './skills/categories/skillCategories';

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

  // If skill not found, create a standardized default entry
  console.warn('Skill not found in universal database:', skillTitle);
  const category = getSkillCategory(skillTitle);
  
  const defaultSkill: UnifiedSkill = {
    id: generateSkillId(skillTitle),
    title: skillTitle,
    subcategory: 'General',
    category: category as SkillCategory,
    weight: 'necessary' as SkillWeight,
    level: 'unspecified' as SkillLevel,
    growth: '0%',
    confidence: 'medium',
    requirement: 'preferred',
    salary: 'N/A',
    benchmarks: { B: true, R: true, M: true, O: true }
  };

  // Add to skillDefinitions for future use
  skillDefinitions.push(defaultSkill);
  
  return defaultSkill;
};

export const generateSkillId = (title: string): string => {
  return `skill_${title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
};

export const getSkillByTitle = (title: string): UnifiedSkill | undefined => {
  return skillDefinitions.find(
    skill => skill.title.toLowerCase() === title.toLowerCase()
  );
};

export const getAllSkills = (): UnifiedSkill[] => {
  return skillDefinitions;
};

export const getSkillsByCategory = (category: SkillCategory): UnifiedSkill[] => {
  return skillDefinitions.filter(skill => skill.category === category);
};

// Initialize logging
console.log('Skill database service initialized with:', {
  totalSkills: skillDefinitions.length,
  categories: {
    specialized: skillDefinitions.filter(s => s.category === 'specialized').length,
    common: skillDefinitions.filter(s => s.category === 'common').length,
    certification: skillDefinitions.filter(s => s.category === 'certification').length
  }
});