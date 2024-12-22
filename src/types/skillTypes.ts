// Basic type definitions
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';
export type RoleSkillRequirement = 'required' | 'preferred';
export type SkillLevel = 'advanced' | 'intermediate' | 'beginner' | 'unspecified';

// Core skill interface
export interface UnifiedSkill {
  id: string;
  title: string;
  subcategory: string;
  category: SkillCategory;
  businessCategory?: string;
  weight: SkillWeight;
  level?: SkillLevel;
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
  requirement: EmployeeSkillRequirement | RoleSkillRequirement;
}

export interface EmployeeSkillState extends BaseSkillState {
  skillId: string;
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
export const getSkillLevel = (state: BaseSkillState | string): SkillLevel => {
  if (typeof state === 'string') return state as SkillLevel;
  return state.level;
};

export const getSkillRequirement = (state: BaseSkillState): EmployeeSkillRequirement | RoleSkillRequirement => {
  return state.requirement;
};

export const isSkillGoal = (state: EmployeeSkillState): boolean => {
  return state.requirement === 'skill_goal';
};

export const isRequiredSkill = (state: RoleSkillState): boolean => {
  return state.requirement === 'required';
};