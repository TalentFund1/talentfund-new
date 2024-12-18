import { getAllSkills } from '../../skillsData';

// Helper function to get skills by category
const getSkillsByCategory = (category: string) => {
  return getAllSkills()
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
  // First check exact matches
  if (specializedSkills.includes(skillTitle)) {
    console.log(`${skillTitle} found in specialized skills list`);
    return 'specialized';
  }
  if (commonSkills.includes(skillTitle)) {
    console.log(`${skillTitle} found in common skills list`);
    return 'common';
  }
  if (certificationSkills.includes(skillTitle)) {
    console.log(`${skillTitle} found in certification skills list`);
    return 'certification';
  }
  
  // Default to common if no match is found
  console.log(`${skillTitle} defaulting to common category`);
  return 'common';
};