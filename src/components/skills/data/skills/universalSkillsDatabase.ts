import { UnifiedSkill } from '../../types/SkillTypes';
import { technicalSkills } from './categories/technicalSkills';
import { commonSkills } from './categories/commonSkills';
import { certificationSkills } from './categories/certificationSkills';

// Combine all skills into one database
const allSkills: UnifiedSkill[] = [
  ...technicalSkills,
  ...commonSkills,
  ...certificationSkills
];

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

export const getAllSkills = () => allSkills;

console.log('Universal skills database initialized with', allSkills.length, 'skills');

export const universalSkillsDatabase = allSkills;