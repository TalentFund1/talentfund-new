import { UnifiedSkill } from '../types/SkillTypes';
import { universalSkillsDatabase, getAllSkills, getSkillByTitle } from './skills/universalSkillsDatabase';

// Helper function to generate a skill ID if none exists
const generateSkillId = (title: string, category: string): string => {
  const prefix = category.toUpperCase().slice(0, 3);
  const cleanTitle = title.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 3);
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `SKILL_${prefix}_${cleanTitle}_${randomNum}`;
};

export const getUnifiedSkillData = (skillTitle: string): UnifiedSkill => {
  const skill = getSkillByTitle(skillTitle);
  if (skill) {
    return {
      ...skill,
      id: skill.id || generateSkillId(skill.title, skill.category)
    };
  }

  console.log(`Skill not found in database: ${skillTitle}, creating new entry`);
  return {
    id: generateSkillId(skillTitle, 'common'),
    title: skillTitle,
    subcategory: 'General',
    category: 'common',
    businessCategory: 'Information Technology',
    weight: 'necessary',
    level: 'intermediate',
    growth: '10%',
    salary: '$0',
    confidence: 'medium',
    benchmarks: { B: true, R: true, M: true, O: true }
  };
};

export const getAllUnifiedSkills = (): UnifiedSkill[] => {
  return getAllSkills();
};

console.log('Skill database service initialized');