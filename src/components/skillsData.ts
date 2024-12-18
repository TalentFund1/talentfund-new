import { UnifiedSkill } from './skills/types/SkillTypes';
import { aiSkills } from './skills/data/categories/aiSkills';
import { webSkills } from './skills/data/categories/webSkills';
import { devopsSkills } from './skills/data/categories/devopsSkills';

// Combine all skills
const allSkills: UnifiedSkill[] = [
  ...aiSkills,
  ...webSkills,
  ...devopsSkills
];

// Export skill titles for backward compatibility
export const technicalSkills = allSkills
  .filter(skill => skill.category === 'specialized')
  .map(skill => skill.title);

export const softSkills = allSkills
  .filter(skill => skill.category === 'common')
  .map(skill => skill.title);

// Export full skill objects
export const technicalSkillObjects = allSkills.filter(skill => skill.category === 'specialized');
export const softSkillObjects = allSkills.filter(skill => skill.category === 'common');

console.log('Loaded skills:', {
  total: allSkills.length,
  technical: technicalSkills.length,
  soft: softSkills.length
});

// Helper functions
export const getAllSkills = (): UnifiedSkill[] => allSkills;

export const getSkillById = (id: string): UnifiedSkill | undefined => {
  return allSkills.find(skill => skill.id === id);
};

export const getSkillByTitle = (title: string): UnifiedSkill | undefined => {
  return allSkills.find(skill => skill.title.toLowerCase() === title.toLowerCase());
};