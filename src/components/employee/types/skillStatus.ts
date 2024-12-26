export type SkillGoalStatus = 'required' | 'preferred' | 'unknown' | 'skill_goal' | 'not_interested';

export const normalizeSkillStatus = (status: string): SkillGoalStatus => {
  // Map legacy values to new system
  if (status === 'skill_goal') return 'required';
  if (status === 'not_interested') return 'preferred';
  
  switch (status.toLowerCase()) {
    case 'required':
      return 'required';
    case 'preferred':
      return 'preferred';
    default:
      return 'unknown';
  }
};