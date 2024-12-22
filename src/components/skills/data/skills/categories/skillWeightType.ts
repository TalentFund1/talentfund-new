import { SkillWeight, SkillCategory } from '../../../../../types/skillTypes';
import { skillDefinitions } from '../skillDefinitions';

const skillDefinitionMap = new Map(
  skillDefinitions.map(skill => [skill.title.toLowerCase(), skill])
);

export const getSkillWeight = (skill: { title: string }): SkillWeight => {
  console.log('Getting weight for skill:', skill.title);
  const skillDef = skillDefinitionMap.get(skill.title.toLowerCase());
  return skillDef?.weight || 'necessary';
};

export const getSkillType = (skill: { title: string }): SkillCategory => {
  console.log('Getting type for skill:', skill.title);
  const skillDef = skillDefinitionMap.get(skill.title.toLowerCase());
  return skillDef?.category || 'common';
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