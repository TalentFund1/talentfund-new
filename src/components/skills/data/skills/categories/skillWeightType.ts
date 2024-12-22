import { SkillWeight, SkillCategory } from '../../../types/SkillTypes';
import { skillDefinitions } from '../skillDefinitions';

const skillDefinitionMap = new Map(
  skillDefinitions.map(skill => [skill.title, skill])
);

export const getSkillWeight = (skillTitle: string): SkillWeight => {
  console.log('Determining weight for skill:', skillTitle);
  const skill = skillDefinitionMap.get(skillTitle);
  return skill?.weight || 'necessary';
};

export const getSkillType = (skillTitle: string): SkillCategory => {
  console.log('Determining type for skill:', skillTitle);
  const skill = skillDefinitionMap.get(skillTitle);
  return skill?.category || 'common';
};

export const getWeightColor = (weight: SkillWeight): string => {
  switch (weight) {
    case 'critical':
      return 'bg-red-100 text-red-800';
    case 'technical':
      return 'bg-blue-100 text-blue-800';
    case 'necessary':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getTypeColor = (type: SkillCategory): string => {
  switch (type) {
    case 'specialized':
      return 'bg-blue-100 text-blue-800';
    case 'certification':
      return 'bg-purple-100 text-purple-800';
    case 'common':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};