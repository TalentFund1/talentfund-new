import { UnifiedSkill } from '../../types/SkillTypes';
import { universalSkillsDatabase, getAllSkills as getUniversalSkills } from './universalSkillsDatabase';

// Memoize the skills array to prevent unnecessary recalculations
let memoizedSkills: UnifiedSkill[] | null = null;

// Helper function to generate a skill ID if none exists
const generateSkillId = (title: string, category: string): string => {
  const prefix = category.toUpperCase().slice(0, 3);
  const cleanTitle = title.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 3);
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `SKILL_${prefix}_${cleanTitle}_${randomNum}`;
};

// Get all skills from universal database
export const getAllSkills = (): UnifiedSkill[] => {
  if (memoizedSkills) {
    return memoizedSkills;
  }

  console.log('Initializing skills from universal database...');
  memoizedSkills = getUniversalSkills();
  return memoizedSkills;
};

// Helper function to get skills by category with memoization
const categoryCache: { [key: string]: UnifiedSkill[] } = {};
export const getSkillsByCategory = (category: string): UnifiedSkill[] => {
  if (categoryCache[category]) {
    return categoryCache[category];
  }

  console.log(`Getting skills for category: ${category}`);
  const skills = getAllSkills().filter(skill => skill.category === category);
  categoryCache[category] = skills;
  return skills;
};

// Helper function to find a skill by ID with memoization
const idCache: { [key: string]: UnifiedSkill | undefined } = {};
export const getSkillById = (id: string): UnifiedSkill | undefined => {
  if (idCache[id] !== undefined) {
    return idCache[id];
  }

  console.log(`Finding skill by ID: ${id}`);
  const skill = getAllSkills().find(skill => skill.id === id);
  idCache[id] = skill;
  return skill;
};

// Helper function to find a skill by title with memoization
const titleCache: { [key: string]: UnifiedSkill | undefined } = {};
export const getSkillByTitle = (title: string): UnifiedSkill | undefined => {
  const lowerTitle = title.toLowerCase();
  if (titleCache[lowerTitle] !== undefined) {
    return titleCache[lowerTitle];
  }

  console.log(`Finding skill by title: ${title}`);
  const skill = getAllSkills().find(skill => skill.title.toLowerCase() === lowerTitle);
  titleCache[lowerTitle] = skill;
  
  if (!skill) {
    console.log(`Skill not found: ${title}`);
  }
  return skill;
};

// Role-specific skill categorization helpers with memoization
const specializedCache: UnifiedSkill[] | null = null;
export const getSpecializedSkills = (): UnifiedSkill[] => {
  if (specializedCache) return specializedCache;
  return getAllSkills().filter(skill => skill.category === 'specialized');
};

const commonCache: UnifiedSkill[] | null = null;
export const getCommonSkills = (): UnifiedSkill[] => {
  if (commonCache) return commonCache;
  return getAllSkills().filter(skill => skill.category === 'common');
};

const certificationCache: UnifiedSkill[] | null = null;
export const getCertificationSkills = (): UnifiedSkill[] => {
  if (certificationCache) return certificationCache;
  return getAllSkills().filter(skill => skill.category === 'certification');
};

// Export Skills object for backward compatibility
export const Skills = {
  all: getAllSkills(),
  specialized: getSpecializedSkills(),
  common: getCommonSkills(),
  certification: getCertificationSkills()
};

console.log('Skills database loaded:', {
  total: getAllSkills().length,
  byCategory: {
    specialized: getSpecializedSkills().length,
    common: getCommonSkills().length,
    certification: getCertificationSkills().length
  },
  byWeight: {
    critical: getAllSkills().filter(skill => skill.weight === 'critical').length,
    technical: getAllSkills().filter(skill => skill.weight === 'technical').length,
    necessary: getAllSkills().filter(skill => skill.weight === 'necessary').length
  }
});