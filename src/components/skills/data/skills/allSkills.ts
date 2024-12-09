import { UnifiedSkill } from '../../types/SkillTypes';
import { technicalSkills } from './skillCategories/technicalSkills';
import { managementSkills } from './skillCategories/managementSkills';
import { certificationSkills } from './skillCategories/certificationSkills';

// Combine all skills into one unified object
export const Skills: UnifiedSkill[] = [
  ...technicalSkills,
  ...managementSkills,
  ...certificationSkills
];

// Helper function to get all skills as a flat array
export const getAllSkills = (): UnifiedSkill[] => {
  return Skills;
};

// Helper function to get skills by category
export const getSkillsByCategory = (category: 'specialized' | 'common' | 'certification'): UnifiedSkill[] => {
  return Skills.filter(skill => skill.category === category);
};

// Helper function to find a skill by title
export const findSkillByTitle = (title: string): UnifiedSkill | undefined => {
  return Skills.find(skill => skill.title === title);
};

// Log detailed skill counts
console.log('Skills Database Statistics:', {
  totalSkills: Skills.length,
  categoryCounts: {
    technical: technicalSkills.length,
    management: managementSkills.length,
    certification: certificationSkills.length
  },
  skillsByWeight: {
    critical: Skills.filter(skill => skill.weight === 'critical').length,
    technical: Skills.filter(skill => skill.weight === 'technical').length,
    necessary: Skills.filter(skill => skill.weight === 'necessary').length
  },
  skillsByCategory: {
    specialized: Skills.filter(skill => skill.category === 'specialized').length,
    common: Skills.filter(skill => skill.category === 'common').length,
    certification: Skills.filter(skill => skill.category === 'certification').length
  }
});