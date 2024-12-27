import { SkillLevel } from '../types/sharedSkillTypes';

export const getLevelImportance = (level: SkillLevel = 'unspecified'): number => {
  const values: { [key: string]: number } = {
    'advanced': 4,
    'intermediate': 3,
    'beginner': 2,
    'unspecified': 1
  };
  return values[level.toLowerCase()] ?? 1;
};
