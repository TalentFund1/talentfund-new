import { SkillEntry, SkillType, SkillCategory } from '../types/SkillTypes';
import { aiSkills } from './skills/aiSkills';
import { backendSkills } from './skills/backendSkills';
import { commonSkills } from './skills/commonSkills';
import { certificationSkills } from './skills/certificationSkills';

// Helper function to determine skill type based on growth and category
const determineType = (growth: string, category: SkillCategory): SkillType => {
  const growthValue = parseFloat(growth);
  if (growthValue >= 25) return 'critical';
  if (category === 'specialized' || category === 'common') return 'technical';
  return 'necessary';
};

// Convert existing skills to new format
const convertSkill = (skill: any, category: SkillCategory): SkillEntry => {
  console.log('Converting skill:', { title: skill.title, category });
  
  return {
    title: skill.title,
    category,
    type: determineType(skill.growth || '0%', category),
    subcategory: skill.subcategory,
    level: skill.level,
    growth: skill.growth,
    salary: skill.salary,
    confidence: skill.confidence || 'medium',
    tracks: skill.tracks,
    benchmarks: skill.benchmarks || { B: true, R: true, M: true, O: true }
  };
};

// Combine and convert all skills
const consolidateSkills = (): SkillEntry[] => {
  console.log('Starting skills consolidation...');
  
  const allSkills: SkillEntry[] = [
    ...aiSkills.map(skill => convertSkill(skill, 'specialized')),
    ...backendSkills.map(skill => convertSkill(skill, 'specialized')),
    ...commonSkills.map(skill => convertSkill(skill, 'common')),
    ...certificationSkills.map(skill => convertSkill(skill, 'certification'))
  ];

  console.log('Consolidated skills count:', allSkills.length);
  return allSkills;
};

export const skillsDatabase = consolidateSkills();

// Helper functions
export const getSkillByTitle = (title: string): SkillEntry | undefined => {
  return skillsDatabase.find(skill => skill.title === title);
};

export const getSkillsByCategory = (category: SkillCategory): SkillEntry[] => {
  return skillsDatabase.filter(skill => skill.category === category);
};

export const getSkillsByType = (type: SkillType): SkillEntry[] => {
  return skillsDatabase.filter(skill => skill.type === type);
};