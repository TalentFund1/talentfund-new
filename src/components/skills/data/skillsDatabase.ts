import { Skill, SkillWeight, SkillCategory } from '../types/SkillTypes';
import { aiSkills } from './skills/aiSkills';
import { backendSkills } from './skills/backendSkills';
import { commonSkills } from './skills/commonSkills';
import { certificationSkills } from './skills/certificationSkills';

// Helper function to determine skill weight based on growth and category
const determineWeight = (growth: string, category: string): SkillWeight => {
  const growthValue = parseFloat(growth);
  if (growthValue >= 25) return 'critical';
  if (category === 'specialized' || category === 'common') return 'technical';
  return 'necessary';
};

// Convert existing skills to new format
const convertSkill = (skill: any, category: SkillCategory): Skill => {
  console.log('Converting skill:', { title: skill.title, category });
  
  return {
    id: `SKILL_${skill.title.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`,
    title: skill.title,
    category: category,
    subcategory: skill.subcategory,
    weight: determineWeight(skill.growth || '0%', category),
    level: skill.level || 'beginner',
    growth: skill.growth || '0%',
    salary: skill.salary || '$0',
    confidence: skill.confidence || 'medium',
    benchmarks: {
      B: true,
      R: true,
      M: true,
      O: true
    }
  };
};

// Combine and convert all skills
const consolidateSkills = (): Skill[] => {
  console.log('Starting skills consolidation...');
  
  const allSkills: Skill[] = [
    ...aiSkills.map(skill => convertSkill(skill, skill.category)),
    ...backendSkills.map(skill => convertSkill(skill, skill.category)),
    ...commonSkills.map(skill => convertSkill(skill, skill.category)),
    ...certificationSkills.map(skill => convertSkill(skill, skill.category))
  ];

  console.log('Consolidated skills count:', allSkills.length);
  return allSkills;
};

export const skillsDatabase = consolidateSkills();

// Helper functions
export const getSkillByTitle = (title: string): Skill | undefined => {
  return skillsDatabase.find(skill => skill.title === title);
};

export const getSkillsByWeight = (weight: SkillWeight): Skill[] => {
  return skillsDatabase.filter(skill => skill.weight === weight);
};

export const getSkillsByCategory = (category: SkillCategory): Skill[] => {
  return skillsDatabase.filter(skill => skill.category === category);
};