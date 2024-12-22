// Basic type definitions
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type SkillLevel = 'advanced' | 'intermediate' | 'beginner' | 'unspecified';
export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';
export type RoleSkillRequirement = 'required' | 'preferred';

// Base skill interface
export interface BaseSkill {
  id: string;
  title: string;
}

// Core skill interface
export interface UnifiedSkill extends BaseSkill {
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
export const getSkillStateLevel = (state: BaseSkillState): SkillLevel => {
  return state.level;
};

export const getSkillRequirement = (state: BaseSkillState): EmployeeSkillRequirement | RoleSkillRequirement => {
  if ('requirement' in state) {
    return (state as EmployeeSkillState | RoleSkillState).requirement;
  }
  return 'unknown';
};

// Type guards
export const isEmployeeSkillState = (state: any): state is EmployeeSkillState => {
  return state && 
    'id' in state &&
    'level' in state && 
    'requirement' in state &&
    ['skill_goal', 'not_interested', 'unknown'].includes(state.requirement);
};

export const isRoleSkillState = (state: any): state is RoleSkillState => {
  return state && 
    'id' in state &&
    'level' in state && 
    'requirement' in state &&
    ['required', 'preferred'].includes(state.requirement);
};

// Helper to ensure valid skill level
export const ensureValidSkillLevel = (level: string): SkillLevel => {
  const validLevels: SkillLevel[] = ['advanced', 'intermediate', 'beginner', 'unspecified'];
  return validLevels.includes(level as SkillLevel) ? level as SkillLevel : 'unspecified';
};

// Helper to convert skill state to string representation
export const skillStateToString = (state: BaseSkillState): string => {
  return state.level;
};

// Helper to convert any skill state to employee skill state
export const toEmployeeSkillState = (state: any): EmployeeSkillState => {
  return {
    id: state.id || state.skillId || '',
    level: ensureValidSkillLevel(state.level),
    requirement: state.requirement || 'unknown'
  };
};

// Helper to convert any skill state to role skill state
export const toRoleSkillState = (state: any): RoleSkillState => {
  return {
    id: state.id || state.skillId || '',
    level: ensureValidSkillLevel(state.level),
    requirement: state.requirement || 'preferred'
  };
};

// Helper to convert level string to SkillLevel
export const parseSkillLevel = (level: string): SkillLevel => {
  return ensureValidSkillLevel(level.toLowerCase());
};

// Helper to convert requirement string to appropriate type
export const parseSkillRequirement = (requirement: string): EmployeeSkillRequirement | RoleSkillRequirement => {
  if (['skill_goal', 'not_interested', 'unknown'].includes(requirement)) {
    return requirement as EmployeeSkillRequirement;
  }
  if (['required', 'preferred'].includes(requirement)) {
    return requirement as RoleSkillRequirement;
  }
  return 'unknown';
};