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

console.log('Loaded skills:', {
  total: getAllSkills().length,
  byCategory: Object.fromEntries(
    Object.entries(Skills).map(([key, skills]) => [key, skills.length])
  )
});