import { UnifiedSkill } from '../../types/SkillTypes';
import { technicalSkills } from './skillCategories/technicalSkills';
import { managementSkills } from './skillCategories/managementSkills';
import { certificationSkills } from './skillCategories/certificationSkills';

export const Skills = {
  technical: technicalSkills,
  management: managementSkills,
  certification: certificationSkills
};

// Helper function to get all skills as a flat array
export const getAllSkills = (): UnifiedSkill[] => {
  return Object.values(Skills).flat();
};

// Helper function to get skills by category
export const getSkillsByCategory = (category: keyof typeof Skills): UnifiedSkill[] => {
  return Skills[category] || [];
};

// Helper function to find a skill by title
export const findSkillByTitle = (title: string): UnifiedSkill | undefined => {
  return getAllSkills().find(skill => skill.title === title);
};

// Log detailed skill counts
console.log('Skills Database Statistics:', {
  totalSkills: getAllSkills().length,
  categoryCounts: {
    technical: technicalSkills.length,
    management: managementSkills.length,
    certification: certificationSkills.length
  },
  skillsByWeight: {
    critical: getAllSkills().filter(skill => skill.weight === 'critical').length,
    technical: getAllSkills().filter(skill => skill.weight === 'technical').length,
    necessary: getAllSkills().filter(skill => skill.weight === 'necessary').length
  },
  skillsByCategory: {
    specialized: getAllSkills().filter(skill => skill.category === 'specialized').length,
    common: getAllSkills().filter(skill => skill.category === 'common').length,
    certification: getAllSkills().filter(skill => skill.category === 'certification').length
  }
});