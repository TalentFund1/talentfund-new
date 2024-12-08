import { technicalSkills as techSkills } from './skills/data/categories/technicalSkills';
import { softSkills as softSkillsData } from './skills/data/categories/softSkills';
import { certificationSkills as certSkills } from './skills/data/categories/certificationSkills';

// Combine all skills
export const skills = [
  ...techSkills,
  ...softSkillsData,
  ...certSkills
];

// Map skills to titles for components that expect string arrays
export const technicalSkillTitles = techSkills.map(skill => skill.title);
export const softSkillTitles = softSkillsData.map(skill => skill.title);
export const certificationTitles = certSkills.map(skill => skill.title);

// Export full skill objects for when we need the complete data
export const technicalSkills = techSkills;
export const softSkills = softSkillsData;
export const certificationSkills = certSkills;

console.log('Loaded skills:', {
  total: skills.length,
  technical: technicalSkillTitles.length,
  soft: softSkillTitles.length,
  certifications: certificationTitles.length
});