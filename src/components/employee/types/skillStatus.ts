export type SkillGoalStatus = 'required' | 'preferred' | 'unknown';

export const normalizeSkillStatus = (status: string): SkillGoalStatus => {
  console.log('Normalizing skill status:', { originalStatus: status });
  
  // Map legacy values to new system
  switch (status.toLowerCase()) {
    case 'skill_goal':
    case 'required':
      return 'required';
    case 'not_interested':
    case 'preferred':
      return 'preferred';
    default:
      return 'unknown';
  }
};

console.log('Skill status normalization updated with simplified mapping');