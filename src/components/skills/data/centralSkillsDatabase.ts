import { UnifiedSkill } from '../types/SkillTypes';
import { technicalSkills } from './skills/categories/technicalSkills';
import { softSkills } from './skills/categories/softSkills';

// Combine all skills
export const allSkills: UnifiedSkill[] = [...technicalSkills, ...softSkills];

// Helper function to normalize skill titles
export const normalizeSkillTitle = (title: string): string => {
  if (title.toLowerCase().includes('certification') || 
      title.toLowerCase().includes('certificate')) {
    return title.replace(/certificate/i, 'Certification')
               .replace(/certified/i, 'Certification');
  }
  return title;
};

// Get all skills with normalized titles
export const getAllSkills = (): UnifiedSkill[] => {
  return allSkills.map(skill => ({
    ...skill,
    title: normalizeSkillTitle(skill.title)
  }));
};

// Helper function to get skills by category
export const getSkillsByCategory = (category: string): UnifiedSkill[] => {
  return getAllSkills().filter(skill => skill.category === category);
};

// Helper function to get skills by weight
export const getSkillsByWeight = (weight: string): UnifiedSkill[] => {
  return getAllSkills().filter(skill => skill.weight === weight);
};

// Get technical skills
export const getTechnicalSkills = (): UnifiedSkill[] => {
  return getAllSkills().filter(skill => 
    skill.category === 'specialized' && 
    skill.weight === 'technical'
  );
};

// Get soft skills
export const getSoftSkills = (): UnifiedSkill[] => {
  return getAllSkills().filter(skill => 
    skill.category === 'common' && 
    skill.weight === 'necessary'
  );
};

// Export simple arrays of skill titles for backward compatibility
export const technicalSkillTitles = getTechnicalSkills().map(skill => skill.title);
export const softSkillTitles = getSoftSkills().map(skill => skill.title);

console.log('Central skills database loaded with', allSkills.length, 'skills');