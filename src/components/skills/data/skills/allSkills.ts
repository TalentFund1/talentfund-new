import { UnifiedSkill } from '../../types/SkillTypes';
import { skillDefinitions } from './skillDefinitions';

export const getAllSkills = (): UnifiedSkill[] => {
  console.log('Getting all skills:', skillDefinitions.length, 'skills found');
  return skillDefinitions;
};

export const getSkillsByCategory = (category: string): UnifiedSkill[] => {
  console.log(`Getting skills for category: ${category}`);
  return skillDefinitions.filter(skill => skill.category === category);
};

export const getSkillByTitle = (title: string): UnifiedSkill | undefined => {
  console.log(`Finding skill by title: ${title}`);
  return skillDefinitions.find(
    skill => skill.title.toLowerCase() === title.toLowerCase()
  );
};

export const Skills = {
  all: getAllSkills(),
  specialized: getSkillsByCategory('specialized'),
  common: getSkillsByCategory('common'),
  certification: getSkillsByCategory('certification')
};

console.log('Skills loaded:', {
  total: skillDefinitions.length,
  byCategory: {
    specialized: getSkillsByCategory('specialized').length,
    common: getSkillsByCategory('common').length,
    certification: getSkillsByCategory('certification').length
  }
});