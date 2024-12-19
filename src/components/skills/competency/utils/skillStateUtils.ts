import { SkillState, SkillRequirement } from '../state/types';

export const getSkillStateValue = (state: string | SkillState): string => {
  if (typeof state === 'string') {
    return state;
  }
  return state.level || 'unspecified';
};

export const getRequirementValue = (state: string | SkillState | SkillRequirement): string => {
  if (typeof state === 'string') {
    return state;
  }
  if ('required' in state) {
    return state.required;
  }
  return 'preferred';
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

export const getLevelString = (level: string | SkillState): string => {
  const value = getSkillStateValue(level);
  return value.toLowerCase();
};

export const getRequirementString = (requirement: string | SkillState | SkillRequirement): string => {
  const value = getRequirementValue(requirement);
  return value.toLowerCase();
};

export const formatSkillLevel = (level: string | SkillState): string => {
  const levelStr = getLevelString(level);
  return levelStr.charAt(0).toUpperCase() + levelStr.slice(1);
};