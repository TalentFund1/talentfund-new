// Basic type definitions
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';
export type RoleSkillRequirement = 'required' | 'preferred';

// Core state interfaces
export interface BaseSkillState {
  level: string;
}

export interface EmployeeSkillState extends BaseSkillState {
  skillId: string;
  requirement: EmployeeSkillRequirement;
}

export interface RoleSkillState extends BaseSkillState {
  id: string;
  requirement: RoleSkillRequirement;
}

// Skill data interfaces
export interface UnifiedSkill {
  id: string;
  title: string;
  subcategory: string;
  category?: string;
  businessCategory?: string;
  weight?: SkillWeight;
  level?: string;
  growth: string;
  confidence: string;
  requirement?: RoleSkillRequirement;
  salary?: string;
  benchmarks?: { [key: string]: boolean };
}

export interface RoleSkillData {
  title: string;
  specialized: UnifiedSkill[];
  common: UnifiedSkill[];
  certifications: UnifiedSkill[];
  roleTrack?: string;
}

export interface RoleState {
  [skillName: string]: {
    [level: string]: RoleSkillState;
  };
}

export interface ProfileSkillStates {
  [profileId: string]: {
    [skillId: string]: EmployeeSkillState;
  };
}

// Helper functions
export const getSkillLevel = (state: EmployeeSkillState | RoleSkillState | string): string => {
  if (typeof state === 'string') return state;
  return state.level || 'unspecified';
};

export const getSkillRequirement = (state: EmployeeSkillState | RoleSkillState): string => {
  return state.requirement;
};

export const isSkillGoal = (state: EmployeeSkillState): boolean => {
  return state.requirement === 'skill_goal';
};

export const isRequiredSkill = (state: RoleSkillState): boolean => {
  return state.requirement === 'required';
};

// Type conversion utilities
export const convertToEmployeeSkillState = (
  skillId: string,
  level: string = 'unspecified',
  requirement: EmployeeSkillRequirement = 'unknown'
): EmployeeSkillState => ({
  skillId,
  level,
  requirement
});

export const convertToRoleSkillState = (
  id: string,
  level: string = 'unspecified',
  requirement: RoleSkillRequirement = 'preferred'
): RoleSkillState => ({
  id,
  level,
  requirement
});