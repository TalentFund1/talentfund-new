import { technicalSkills } from './categories/technicalSkills';
import { commonSkills } from './categories/commonSkills';
import { UnifiedSkill, SimpleSkill } from '../../types/SkillTypes';

// Export the Skills object that other files are trying to import
export const Skills = {
  specialized: technicalSkills.filter(skill => skill.category === 'specialized'),
  common: commonSkills.filter(skill => skill.category === 'common'),
  certification: technicalSkills.filter(skill => skill.category === 'certification')
};

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
    businessCategory: skill.businessCategory,
    level: skill.level,
    growth: skill.growth,
    weight: skill.weight,
    salary: skill.salary,
    confidence: skill.confidence,
    benchmarks: skill.benchmarks
  }));
};