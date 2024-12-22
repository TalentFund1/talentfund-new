import { UnifiedSkill } from '../types/SkillTypes';
import { skillDefinitions } from './skills/skillDefinitions';

// Use the consolidated skills directly
export const skillsDatabase = skillDefinitions;

// Helper functions
export const getSkillByTitle = (title: string): UnifiedSkill | undefined => {
  return skillsDatabase.find(skill => skill.title.toLowerCase() === title.toLowerCase());
};

export const getSkillsByCategory = (category: string): UnifiedSkill[] => {
  return skillsDatabase.filter(skill => skill.category === category);
};

console.log('Skills database initialized with universal database:', {
  totalSkills: skillsDatabase.length
});