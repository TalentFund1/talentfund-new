import { technicalSkills } from './categories/technicalSkills';
import { commonSkills } from './categories/commonSkills';
import { SimpleSkill } from '../../types/SkillTypes';

export const getAllSkills = (): SimpleSkill[] => {
  console.log('Getting all skills from local data');
  
  // Combine all skills from different categories
  const allSkills = [
    ...technicalSkills,
    ...commonSkills
  ];

  console.log('Total skills loaded:', allSkills.length);
  
  return allSkills.map(skill => ({
    title: skill.title,
    subcategory: skill.subcategory,
    category: skill.category,
    level: skill.level,
    growth: skill.growth
  }));
};