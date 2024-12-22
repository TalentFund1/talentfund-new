import { SkillWeight } from '../../../../../types/skillTypes';
import { getSkillCategory } from './skillCategories';

export const getSkillWeight = (skillTitle: string): SkillWeight => {
  const category = getSkillCategory(skillTitle);
  
  // Certifications and specialized skills are typically critical
  if (category === 'certification' || 
      skillTitle.toLowerCase().includes('aws') || 
      skillTitle.toLowerCase().includes('cloud')) {
    return 'critical';
  }
  
  // Most specialized skills are technical
  if (category === 'specialized') {
    return 'technical';
  }
  
  // Common skills are necessary
  return 'necessary';
};

console.log('Skill weights system initialized');