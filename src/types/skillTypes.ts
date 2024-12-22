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
  name?: string; // For backward compatibility
}

// Core skill interface
export interface UnifiedSkill extends BaseSkill {
  subcategory: string;
  category?: SkillCategory;
  businessCategory?: string;
  weight?: SkillWeight;
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
  toString(): string;
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

// For detailed skill display
export interface DetailedSkill extends BaseSkill {
  level: SkillLevel;
  isSkillGoal: boolean;
}

// Helper functions
export const getSkillStateLevel = (state: EmployeeSkillState | RoleSkillState): SkillLevel => {
  return state.level;
};

export const getSkillRequirement = (state: EmployeeSkillState | RoleSkillState): EmployeeSkillRequirement | RoleSkillRequirement => {
  return state.requirement;
};

export const isSkillGoal = (state: EmployeeSkillState): boolean => {
  return state.requirement === 'skill_goal';
};

export const isRequiredSkill = (state: RoleSkillState): boolean => {
  return state.requirement === 'required';
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

// Helper to convert any skill state to employee skill state
export const toEmployeeSkillState = (state: any): EmployeeSkillState => {
  const skillState: EmployeeSkillState = {
    id: state.id || state.skillId || '',
    level: ensureValidSkillLevel(state.level),
    requirement: state.requirement || 'unknown',
    toString: function() {
      return this.level;
    }
  };
  return skillState;
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

// Create a class implementation of EmployeeSkillState for proper string conversion
export class EmployeeSkillStateImpl implements EmployeeSkillState {
  constructor(
    public id: string,
    public level: SkillLevel,
    public requirement: EmployeeSkillRequirement
  ) {}

  toString(): string {
    return this.level;
  }
}