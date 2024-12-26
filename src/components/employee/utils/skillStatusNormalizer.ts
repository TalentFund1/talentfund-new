import { SkillGoalStatus, LegacyGoalStatus } from '../types/employeeSkillTypes';

export const normalizeGoalStatus = (status: LegacyGoalStatus | undefined): SkillGoalStatus => {
  if (!status) return 'unknown';
  
  switch (status.toLowerCase()) {
    case 'required':
      return 'required';
    case 'preferred':
      return 'preferred';
    case 'skill_goal':
      return 'skill_goal';
    case 'not_interested':
      return 'not_interested';
    default:
      return 'unknown';
  }
};

console.log('Skill status normalizer utility updated');