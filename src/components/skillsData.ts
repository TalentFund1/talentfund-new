import { technicalSkills } from './skills/data/categories/technicalSkills';
import { softSkills } from './skills/data/categories/softSkills';
import { certificationSkills } from './skills/data/categories/certificationSkills';

// Combine all skills
export const skills = [
  ...technicalSkills,
  ...softSkills,
  ...certificationSkills
];

// Map skills to titles for components that expect string arrays
export const technicalSkillTitles = technicalSkills.map(skill => skill.title);
export const softSkillTitles = softSkills.map(skill => skill.title);
export const certificationTitles = certificationSkills.map(skill => skill.title);

// Export full skill objects for when we need the complete data
export const technicalSkillObjects = technicalSkills;
export const softSkillObjects = softSkills;
export const certificationSkillObjects = certificationSkills;

console.log('Loaded skills:', {
  total: skills.length,
  technical: technicalSkillTitles.length,
  soft: softSkillTitles.length,
  certifications: certificationTitles.length
});