import { SkillEntry } from '../types/SkillTypes';
import { aiSkills } from './skills/aiSkills';
import { backendSkills } from './skills/backendSkills';
import { commonSkills } from './skills/commonSkills';
import { certificationSkills } from './skills/certificationSkills';

// Helper function to determine skill category based on growth and type
const determineCategory = (growth: string, type: string): 'critical' | 'technical' | 'necessary' => {
  const growthValue = parseFloat(growth);
  if (growthValue >= 25) return 'critical';
  if (type === 'specialized' || type === 'common') return 'technical';
  return 'necessary';
};

// Convert existing skills to new format
const convertSkill = (skill: any, type: 'specialized' | 'common' | 'certification'): SkillEntry => {
  console.log('Converting skill:', { title: skill.title, type });
  
  return {
    title: skill.title,
    category: determineCategory(skill.growth || '0%', type),
    subcategory: skill.subcategory,
    type,
    growth: skill.growth,
    tracks: {
      professional: skill.professionalTrack,
      managerial: skill.managerialTrack
    }
  };
};

// Combine and convert all skills
const consolidateSkills = (): SkillEntry[] => {
  console.log('Starting skills consolidation...');
  
  const allSkills: SkillEntry[] = [
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
export const getSkillByTitle = (title: string): SkillEntry | undefined => {
  return skillsDatabase.find(skill => skill.title === title);
};

export const getSkillsByCategory = (category: 'critical' | 'technical' | 'necessary'): SkillEntry[] => {
  return skillsDatabase.filter(skill => skill.category === category);
};

export const getSkillsByType = (type: 'specialized' | 'common' | 'certification'): SkillEntry[] => {
  return skillsDatabase.filter(skill => skill.type === type);
};