import { UnifiedSkill } from '../../types/SkillTypes';
import { skillDefinitions } from '../skills/skillDefinitions';

export const getSkillFromDatabase = (skillTitle: string): UnifiedSkill | undefined => {
  console.log('Looking up skill in universal database:', skillTitle);
  return skillDefinitions.find(
    skill => skill.title.toLowerCase() === skillTitle.toLowerCase()
  );
};

export const getSkillWeight = (skillTitle: string): string => {
  const skill = getSkillFromDatabase(skillTitle);
  return skill?.weight || 'necessary';
};

export const getSkillCategory = (skillTitle: string): string => {
  const skill = getSkillFromDatabase(skillTitle);
  return skill?.category || 'common';
};

export const getSkillsByCategory = (category: string): UnifiedSkill[] => {
  return skillDefinitions.filter(skill => skill.category === category);
};

console.log('Skill utilities initialized with universal database');