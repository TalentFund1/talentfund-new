import { SkillWeight, SkillType } from '../../../types/SkillTypes';
import { getAllSkills } from '../allSkills';

export const getSkillWeight = (skillTitle: string): SkillWeight => {
  console.log('Determining weight for skill:', skillTitle);
  
  const skill = getAllSkills().find(s => s.title === skillTitle);
  if (skill) {
    console.log(`Found skill ${skillTitle} in universal database with weight:`, skill.weight);
    return skill.weight;
  }
  
  console.log(`Skill ${skillTitle} not found in universal database, defaulting to necessary`);
  return 'necessary';
};

export const getSkillType = (skillTitle: string): SkillType => {
  console.log('Determining type for skill:', skillTitle);
  
  const skill = getAllSkills().find(s => s.title === skillTitle);
  if (skill) {
    console.log(`Found skill ${skillTitle} in universal database with category:`, skill.category);
    return skill.category;
  }
  
  console.log(`Skill ${skillTitle} not found in universal database, defaulting to common`);
  return 'common';
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

export const getTypeColor = (type: SkillType): string => {
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