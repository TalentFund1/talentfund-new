import { getUnifiedSkillData, getAllUnifiedSkills } from '../../skillDatabaseService';

// Helper function to get skills by category
const getSkillsByCategory = (category: string) => {
  return getAllUnifiedSkills()
    .filter(skill => skill.category === category)
    .map(skill => skill.title);
};

// Get skills from the central database
export const specializedSkills = getSkillsByCategory('specialized');
export const commonSkills = getSkillsByCategory('common');
export const certificationSkills = getSkillsByCategory('certification');

// Helper function to generate a skill ID
export const generateSkillId = (title: string): string => {
  const normalizedTitle = title
    .replace(/certification/gi, 'CERT')
    .replace(/certificate/gi, 'CERT')
    .replace(/certified/gi, 'CERT')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .toUpperCase();
  return `SKILL_${normalizedTitle}`;
};

// Helper function to determine skill category
export const getSkillCategory = (skillTitle: string): 'specialized' | 'common' | 'certification' => {
  const skill = getUnifiedSkillData(skillTitle);
  console.log(`Getting category for ${skillTitle} from central database:`, skill.category);
  return skill.category;
};