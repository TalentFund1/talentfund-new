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

// Skill state interfaces
export interface BaseSkillState {
  id: string;
  level: SkillLevel;
}

export interface EmployeeSkillState extends BaseSkillState {
  requirement: EmployeeSkillRequirement;
}

export interface RoleSkillState extends BaseSkillState {
  requirement: RoleSkillRequirement;
}

export interface RoleState {
  [skillName: string]: {
    [levelKey: string]: RoleSkillState;
  };
}

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