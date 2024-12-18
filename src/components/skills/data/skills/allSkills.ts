import { UnifiedSkill } from '../../types/SkillTypes';
import { technicalSkills } from './skillCategories/technicalSkills';
import { managementSkills } from './skillCategories/managementSkills';
import { certificationSkills } from './skillCategories/certificationSkills';
import { aiSkills } from '../categories/aiSkills';
import { webSkills } from '../categories/webSkills';
import { devopsSkills } from '../categories/devopsSkills';

// Combine all skills from different sources
const allSkills: UnifiedSkill[] = [
  ...technicalSkills,
  ...managementSkills,
  ...certificationSkills,
  ...aiSkills,
  ...webSkills,
  ...devopsSkills
];

// Helper function to get all skills
export const getAllSkills = (): UnifiedSkill[] => {
  console.log('Getting all skills:', allSkills.length, 'skills found');
  return allSkills;
};

// Helper function to get skills by category
export const getSkillsByCategory = (category: string): UnifiedSkill[] => {
  return allSkills.filter(skill => skill.category === category);
};

// Helper function to find a skill by title
export const findSkillByTitle = (title: string): UnifiedSkill | undefined => {
  return allSkills.find(skill => skill.title.toLowerCase() === title.toLowerCase());
};

export const Skills = {
  technical: technicalSkills,
  management: managementSkills,
  certification: certificationSkills,
  ai: aiSkills,
  web: webSkills,
  devops: devopsSkills
};

console.log('Skills loaded:', {
  total: allSkills.length,
  byCategory: Object.fromEntries(
    Object.entries(Skills).map(([key, skills]) => [key, skills.length])
  )
});