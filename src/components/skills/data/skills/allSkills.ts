import { UnifiedSkill } from './categories/skillTypes';
import { technicalSkills } from './definitions/technicalSkills';
import { softSkills } from './definitions/softSkills';
import { certificationSkills } from './definitions/certifications';

// Combine all skills into one unified database
const allSkills: UnifiedSkill[] = [
  ...technicalSkills,
  ...softSkills,
  ...certificationSkills
];

// Helper function to get all skills
export const getAllSkills = (): UnifiedSkill[] => {
  console.log('Getting all skills:', allSkills.length, 'skills found');
  return allSkills;
};

// Helper function to get skills by category
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
    specialized: getSpecializedSkills().length,
    common: getCommonSkills().length,
    certification: getCertificationSkills().length
  },
  byWeight: {
    critical: allSkills.filter(skill => skill.weight === 'critical').length,
    technical: allSkills.filter(skill => skill.weight === 'technical').length,
    necessary: allSkills.filter(skill => skill.weight === 'necessary').length
  }
});