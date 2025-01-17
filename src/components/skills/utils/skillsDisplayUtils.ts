import { SkillLevel } from '../data/skillLevels';

export const getSkillLevelColor = (level: SkillLevel['level']) => {
  switch (level) {
    case 'advanced':
      return 'text-primary-accent bg-primary-accent/10 border-primary-accent';
    case 'intermediate':
      return 'text-primary-icon bg-primary-icon/10 border-primary-icon';
    case 'beginner':
      return 'text-[#008000] bg-[#008000]/10 border-[#008000]';
    default:
      return 'text-gray-400 bg-gray-100/50 border-gray-400';
  }
};

export const getRequirementColor = (requirement: SkillLevel['requirement']) => {
  return requirement === 'required' 
    ? 'bg-gray-100/90 text-[#1f2144]'
    : 'bg-gray-50/90 text-[#1f2144]';
};