import { UnifiedSkill } from '../../types/SkillTypes';
import { getAllSkills, getSkillsByCategory } from '../centralSkillsDatabase';

export const Skills = {
  technical: getSkillsByCategory('specialized'),
  management: getSkillsByCategory('common'),
  certification: getSkillsByCategory('certification')
};

// Helper function to get all skills as a flat array
export { getAllSkills };

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