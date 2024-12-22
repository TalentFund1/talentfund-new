import { SkillCategory } from '../../../../../types/skillTypes';
import { skillDefinitions } from '../skillDefinitions';
import { getUnifiedSkillData } from '../../skillDatabaseService';

const skillDefinitionMap = new Map(
  skillDefinitions.map(skill => [skill.title.toLowerCase(), skill])
);

export const getSkillCategory = (skillTitle: string): SkillCategory => {
  console.log('Getting category for skill:', skillTitle);
  const skillData = getUnifiedSkillData(skillTitle);
  
  if (!skillData) {
    console.warn(`No unified data found for skill: ${skillTitle}`);
    return 'common'; // Default fallback
  }
  
  console.log('Found category for skill:', {
    skill: skillTitle,
    category: skillData.category
  });
  
  return skillData.category || 'common';
};