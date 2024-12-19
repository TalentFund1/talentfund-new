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
  if (typeof level === 'string') {
    return level.toLowerCase();
  }
  return level.level.toLowerCase();
};

export const getRequirementString = (requirement: string | SkillState | SkillRequirement): string => {
  if (typeof requirement === 'string') {
    return requirement.toLowerCase();
  }
  if ('required' in requirement) {
    return requirement.required.toLowerCase();
  }
  return 'preferred';
};

export const formatSkillLevel = (level: string | SkillState): string => {
  const levelStr = getLevelString(level);
  return levelStr.charAt(0).toUpperCase() + levelStr.slice(1);
};