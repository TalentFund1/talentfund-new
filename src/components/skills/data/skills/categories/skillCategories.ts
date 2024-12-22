import { SkillCategory } from '../../../../../types/skillTypes';
import { skillDefinitions } from '../skillDefinitions';

const skillDefinitionMap = new Map(
  skillDefinitions.map(skill => [skill.title.toLowerCase(), skill])
);

export const getSkillCategory = (skillTitle: string): SkillCategory => {
  console.log('Getting category for skill:', skillTitle);
  const skill = skillDefinitionMap.get(skillTitle.toLowerCase());
  
  if (!skill) {
    console.warn(`Skill not found in definition map: ${skillTitle}`);
    return 'common'; // Default fallback
  }
  
  console.log('Found category for skill:', {
    skill: skillTitle,
    category: skill.category
  });
  
  return skill.category || 'common';
};