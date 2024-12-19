export interface SkillState {
  level: string;
  requirement: string;
}

export interface EmployeeSkillState {
  [skillTitle: string]: SkillState;
}

export type SkillStateValue = string | SkillState;

export const getSkillLevel = (state: SkillStateValue): string => {
  if (typeof state === 'string') return state;
  return state.level || 'unspecified';
};

export const getSkillRequirement = (state: SkillStateValue): string => {
  if (typeof state === 'string') return 'preferred';
  return state.requirement || 'preferred';
};

export const formatSkillLevel = (level: SkillStateValue): string => {
  const levelStr = getSkillLevel(level);
  return levelStr.charAt(0).toUpperCase() + levelStr.slice(1);
};

export const compareSkillLevels = (a: SkillStateValue, b: SkillStateValue): boolean => {
  return getSkillLevel(a) === getSkillLevel(b);
};

export const isSkillRequired = (state: SkillStateValue): boolean => {
  const requirement = getSkillRequirement(state);
  return requirement === 'required' || requirement === 'skill_goal';
};