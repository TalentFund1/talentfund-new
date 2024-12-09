import { Skill, SkillWeight, SkillType } from '../types/SkillTypes';
import { aiSkills } from './skills/aiSkills';
import { backendSkills } from './skills/backendSkills';
import { commonSkills } from './skills/commonSkills';
import { certificationSkills } from './skills/certificationSkills';

// Helper function to determine skill category based on growth and weight
const determineCategory = (growth: string, weight: string): SkillWeight => {
  const growthValue = parseFloat(growth);
  if (growthValue >= 25) return 'critical';
  if (weight === 'specialized' || weight === 'common') return 'technical';
  return 'necessary';
};

// Convert existing skills to new format
const convertSkill = (skill: any, type: SkillType): Skill => {
  console.log('Converting skill:', { title: skill.title, type });
  
  return {
    id: skill.id || `CONV_${Date.now()}_${skill.title.replace(/\s+/g, '_')}`,
    title: skill.title,
    type,
    subcategory: skill.subcategory,
    weight: determineCategory(skill.growth || '0%', type),
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
    ...aiSkills.map(skill => convertSkill(skill, skill.type)),
    ...backendSkills.map(skill => convertSkill(skill, skill.type)),
    ...commonSkills.map(skill => convertSkill(skill, skill.type)),
    ...certificationSkills.map(skill => convertSkill(skill, skill.type))
  ];

  console.log('Consolidated skills count:', allSkills.length);
  return allSkills;
};

export const skillsDatabase = consolidateSkills();

// Helper functions
export const getSkillByTitle = (title: string): Skill | undefined => {
  return skillsDatabase.find(skill => skill.title === title);
};

export const getSkillsByType = (type: SkillType): Skill[] => {
  return skillsDatabase.filter(skill => skill.type === type);
};

export const getSkillsByWeight = (weight: SkillWeight): Skill[] => {
  return skillsDatabase.filter(skill => skill.weight === weight);
};