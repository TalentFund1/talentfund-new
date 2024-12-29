import { UnifiedSkill } from '../../types/SkillTypes';
import { technicalSkills } from './categories/technicalSkills';
import { commonSkills } from './categories/commonSkills';
import { certificationSkills } from './categories/certificationSkills';

// Combine all skills from different categories
const allSkills: UnifiedSkill[] = [
  ...technicalSkills,
  ...commonSkills,
  ...certificationSkills
];

// Helper functions to get skills by category
export const getSkillsByCategory = (category: string) => {
  return allSkills.filter(skill => skill.category === category);
};

export const getAllSkills = () => allSkills;

export const getSkillByTitle = (title: string | undefined) => {
  if (!title) {
    console.warn('Attempted to get skill with undefined title');
    return undefined;
  }

  const skill = allSkills.find(skill => 
    skill.title.toLowerCase() === title.toLowerCase()
  );

  if (!skill) {
    console.warn(`Skill not found: ${title}`);
  }

  return skill;
};

console.log('Universal skills database initialized with', allSkills.length, 'skills');

export const universalSkillsDatabase = allSkills;