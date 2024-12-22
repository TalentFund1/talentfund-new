import { SkillCategory } from '../../../types/SkillTypes';
import { skillDefinitions } from '../skillDefinitions';

const skillDefinitionMap = new Map(
  skillDefinitions.map(skill => [skill.title.toLowerCase(), skill])
);

export const getSkillCategory = (skillTitle: string): SkillCategory => {
  console.log('Getting category for skill:', skillTitle);
  const skill = skillDefinitionMap.get(skillTitle.toLowerCase());
  return skill?.category || 'common';
};