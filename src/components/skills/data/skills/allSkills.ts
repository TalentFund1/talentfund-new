import { UnifiedSkill } from '../../types/SkillTypes';
import { technicalSkills } from './categories/technicalSkills';
import { professionalSkills } from './categories/professionalSkills';
import { communicationSkills } from './categories/communicationSkills';

// Helper function to generate a skill ID if none exists
const generateSkillId = (title: string, category: string): string => {
  const prefix = category.toUpperCase().slice(0, 3);
  const cleanTitle = title.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 3);
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `SKILL_${prefix}_${cleanTitle}_${randomNum}`;
};

// Combine all skills from different categories
const allSkills: UnifiedSkill[] = [
  ...technicalSkills,
  ...professionalSkills,
  ...communicationSkills
];

// Helper function to get all skills
export const getAllSkills = (): UnifiedSkill[] => {
  console.log('Getting all skills from universal database:', allSkills.length, 'skills found');
  return allSkills.map(skill => ({
    ...skill,
    id: skill.id || generateSkillId(skill.title, skill.category)
  }));
};

export const getSkillsByCategory = (category: string): UnifiedSkill[] => {
  console.log(`Getting skills for category: ${category}`);
  return allSkills.filter(skill => skill.category === category);
};

// Helper function to find a skill by ID
export const getSkillById = (id: string): UnifiedSkill | undefined => {
  console.log(`Finding skill by ID: ${id}`);
  return allSkills.find(skill => skill.id === id);
};

// Helper function to find a skill by title (case-insensitive)
export const getSkillByTitle = (title: string): UnifiedSkill | undefined => {
  console.log(`Finding skill by title: ${title}`);
  const skill = allSkills.find(skill => skill.title.toLowerCase() === title.toLowerCase());
  if (!skill) {
    console.log(`Skill not found: ${title}`);
  }
  return skill;
};

// Role-specific skill categorization helpers
export const getSpecializedSkills = (): UnifiedSkill[] => {
  return allSkills.filter(skill => skill.category === 'specialized');
};

export const getCommonSkills = (): UnifiedSkill[] => {
  return allSkills.filter(skill => skill.category === 'common');
};

export const getCertificationSkills = (): UnifiedSkill[] => {
  return allSkills.filter(skill => skill.category === 'certification');
};

// Export Skills object for backward compatibility
export const Skills = {
  all: getAllSkills(),
  specialized: getSpecializedSkills(),
  common: getCommonSkills(),
  certification: getCertificationSkills()
};

console.log('Skills loaded:', {
  total: allSkills.length,
  byCategory: {
    specialized: allSkills.filter(skill => skill.category === 'specialized').length,
    common: allSkills.filter(skill => skill.category === 'common').length,
    certification: allSkills.filter(skill => skill.category === 'certification').length
  },
  byWeight: {
    critical: allSkills.filter(skill => skill.weight === 'critical').length,
    technical: allSkills.filter(skill => skill.weight === 'technical').length,
    necessary: allSkills.filter(skill => skill.weight === 'necessary').length
  }
});