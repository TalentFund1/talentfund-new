export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'unspecified';

export const normalizeSkillLevel = (level: string): SkillLevel => {
  switch (level.toLowerCase()) {
    case 'beginner':
      return 'beginner';
    case 'intermediate':
      return 'intermediate';
    case 'advanced':
      return 'advanced';
    default:
      return 'unspecified';
  }
};