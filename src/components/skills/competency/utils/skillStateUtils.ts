import { SkillState } from '../state/types';

export const getSkillStateValue = (state: string | SkillState): string => {
  if (typeof state === 'string') {
    return state;
  }
  return state.level || 'unspecified';
};

export const getRequirementValue = (state: string | SkillState): string => {
  if (typeof state === 'string') {
    return state;
  }
  return state.required || 'preferred';
};

export const normalizeSkillState = (state: string | SkillState): SkillState => {
  if (typeof state === 'string') {
    return {
      level: state,
      required: 'preferred'
    };
  }
  return state;
};