import { SkillEntry } from '../types/skillTypes';
import { technicalSkills, softSkills } from '@/components/skillsData';
import { aiSkills } from './skills/aiSkills';
import { backendSkills } from './skills/backendSkills';
import { certificationSkills } from './skills/certificationSkills';
import { getCategoryForSkill } from '../utils/skillCountUtils';

// Helper function to determine category based on growth and type
const determineCategory = (growth: string, type: string): 'critical' | 'technical' | 'necessary' => {
  const growthNumber = parseFloat(growth);
  if (growthNumber >= 25) return 'critical';
  if (type === 'specialized' || type === 'common') return 'technical';
  return 'necessary';
};

// Convert existing skills to new format
const convertToSkillEntry = (
  title: string,
  subcategory: string = 'General',
  type: 'specialized' | 'common' | 'certification' = 'specialized',
  growth: string = '0%',
  salary: string = '$0',
): SkillEntry => {
  return {
    title,
    category: determineCategory(growth, type),
    subcategory,
    type,
    growth,
    salary,
    benchmarks: { J: false, B: false, O: false },
    tracks: {
      professional: {
        P1: { level: 'unspecified', requirement: 'preferred' },
        P2: { level: 'unspecified', requirement: 'preferred' },
        P3: { level: 'unspecified', requirement: 'preferred' },
        P4: { level: 'unspecified', requirement: 'preferred' },
        P5: { level: 'unspecified', requirement: 'preferred' },
        P6: { level: 'unspecified', requirement: 'preferred' }
      }
    }
  };
};

// Convert existing skills arrays to new format
const technicalEntries: SkillEntry[] = technicalSkills.map(skill => 
  convertToSkillEntry(skill, 'Technical Skills', 'specialized', '15%')
);

const softSkillEntries: SkillEntry[] = softSkills.map(skill =>
  convertToSkillEntry(skill, 'Soft Skills', 'common', '10%')
);

// Combine all skills into one database
export const skillsDatabase: SkillEntry[] = [
  ...technicalEntries,
  ...softSkillEntries,
  // Add specialized skills with their existing track information
  ...aiSkills.map(skill => ({
    ...convertToSkillEntry(skill.title, skill.subcategory, skill.category, '20%'),
    tracks: {
      professional: skill.professionalTrack
    }
  })),
  ...backendSkills.map(skill => ({
    ...convertToSkillEntry(skill.title, skill.subcategory, skill.category, '15%'),
    tracks: {
      professional: skill.professionalTrack
    }
  })),
  ...certificationSkills.map(skill => ({
    ...convertToSkillEntry(skill.title, skill.subcategory, 'certification', '10%'),
    tracks: {
      professional: skill.professionalTrack
    }
  }))
];

// Helper function to get skill by title
export const getSkillByTitle = (title: string): SkillEntry | undefined => {
  return skillsDatabase.find(skill => skill.title === title);
};

// Helper function to get skills by category
export const getSkillsByCategory = (category: 'critical' | 'technical' | 'necessary'): SkillEntry[] => {
  return skillsDatabase.filter(skill => skill.category === category);
};

// Helper function to get skills by type
export const getSkillsByType = (type: 'specialized' | 'common' | 'certification'): SkillEntry[] => {
  return skillsDatabase.filter(skill => skill.type === type);
};

console.log('Initialized skills database with', skillsDatabase.length, 'skills');