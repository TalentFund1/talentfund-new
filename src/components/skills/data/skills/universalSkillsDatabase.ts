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

export const getSkillByTitle = (title: string) => {
  return allSkills.find(skill => 
    skill.title.toLowerCase() === title.toLowerCase()
  );
};

console.log('Universal skills database initialized with', allSkills.length, 'skills');

export const universalSkillsDatabase = allSkills;