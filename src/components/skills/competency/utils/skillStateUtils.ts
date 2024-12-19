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

export const asString = (value: string | SkillState): string => {
  if (typeof value === 'string') return value;
  return value.level || 'unspecified';
};

export const asLowerCase = (value: string | SkillState): string => {
  return asString(value).toLowerCase();
};

export const asRequirement = (value: string | SkillState | SkillRequirement): SkillRequirement => {
  const strValue = getRequirementValue(value);
  return strValue as SkillRequirement;
};

export const formatSkillLevel = (value: string | SkillState): string => {
  const str = asString(value);
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const compareSkillState = (state: string | SkillState, value: string): boolean => {
  return asString(state) === value;
};