// Basic type definitions
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type SkillLevel = 'advanced' | 'intermediate' | 'beginner' | 'unspecified';
export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';
export type RoleSkillRequirement = 'required' | 'preferred';

// Core skill interface
export interface UnifiedSkill {
  id: string;
  title: string;
  subcategory: string;
  category: SkillCategory;
  businessCategory?: string;
  weight: SkillWeight;
  level: SkillLevel;
  growth: string;
  confidence: string;
  requirement?: RoleSkillRequirement;
  salary?: string;
  benchmarks?: { [key: string]: boolean };
}

// Base skill state
export interface BaseSkillState {
  id: string;
  level: SkillLevel;
}

// Employee skill state
export interface EmployeeSkillState extends BaseSkillState {
  requirement: EmployeeSkillRequirement;
}

// Role skill state
export interface RoleSkillState extends BaseSkillState {
  requirement: RoleSkillRequirement;
}

// Role state mapping
export interface RoleState {
  [skillName: string]: {
    [levelKey: string]: RoleSkillState;
  };
}

// Profile skill states mapping
export interface ProfileSkillStates {
  [employeeId: string]: {
    [skillId: string]: EmployeeSkillState;
  };
}

// Helper functions
export const getSkillLevel = (state: BaseSkillState): SkillLevel => {
  return state.level;
};

export const getSkillRequirement = (state: BaseSkillState): EmployeeSkillRequirement | RoleSkillRequirement => {
  if ('requirement' in state) {
    return (state as EmployeeSkillState | RoleSkillState).requirement;
  }
  return 'unknown';
};

export const isSkillGoal = (state: EmployeeSkillState): boolean => {
  return state.requirement === 'skill_goal';
};

export const isRequiredSkill = (state: RoleSkillState): boolean => {
  return state.requirement === 'required';
};

// Type guards
export const isEmployeeSkillState = (state: any): state is EmployeeSkillState => {
  return state && 'requirement' in state && 
    ['skill_goal', 'not_interested', 'unknown'].includes(state.requirement);
};

export const isRoleSkillState = (state: any): state is RoleSkillState => {
  return state && 'requirement' in state && 
    ['required', 'preferred'].includes(state.requirement);
};

// For detailed skill display
export interface DetailedSkill extends BaseSkillState {
  name: string;
  isSkillGoal: boolean;
}

// Skill state conversion helpers
export const convertToEmployeeSkillState = (state: any): EmployeeSkillState => {
  return {
    id: state.id || state.skillId,
    level: state.level || 'unspecified',
    requirement: state.requirement || 'unknown'
  };
};

export const convertToRoleSkillState = (state: any): RoleSkillState => {
  return {
    id: state.id || state.skillId,
    level: state.level || 'unspecified',
    requirement: state.requirement || 'preferred'
  };
};

// Helper to safely get skill level as string
export const getSkillStateLevel = (state: EmployeeSkillState | string): string => {
  if (typeof state === 'string') return state;
  return state.level;
};