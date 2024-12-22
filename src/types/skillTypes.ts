// Basic type definitions
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';
export type RoleSkillRequirement = 'required' | 'preferred';
export type SkillLevel = 'advanced' | 'intermediate' | 'beginner' | 'unspecified';

// Core state interfaces
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
  id: string;
  requirement: RoleSkillRequirement;
}

// Role state interfaces
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

// Skill data interfaces
export interface UnifiedSkill {
  id: string;
  title: string;
  subcategory: string;
  category: SkillCategory;
  businessCategory?: string;
  weight?: SkillWeight;
  level?: SkillLevel;
  growth: string;
  confidence: string;
  requirement?: RoleSkillRequirement;
  salary?: string;
  benchmarks?: { [key: string]: boolean };
}

export interface DetailedSkill {
  name: string;
  level: SkillLevel;
  isSkillGoal: boolean;
}

export interface RoleSkillData {
  title: string;
  soc?: string;
  function?: string;
  mappedTitle?: string;
  occupation?: string;
  description?: string;
  roleTrack?: string;
  specialized: UnifiedSkill[];
  common: UnifiedSkill[];
  certifications: UnifiedSkill[];
  skills: UnifiedSkill[];
}

// Helper functions
export const getSkillLevel = (state: EmployeeSkillState | RoleSkillState): SkillLevel => {
  return state.level || 'unspecified';
};

export const getSkillStateLevel = getSkillLevel;

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
  level: SkillLevel = 'unspecified',
  requirement: EmployeeSkillRequirement = 'unknown'
): EmployeeSkillState => ({
  id: skillId,
  skillId,
  level,
  requirement
});

export const convertToRoleSkillState = (
  id: string,
  level: SkillLevel = 'unspecified',
  requirement: RoleSkillRequirement = 'preferred'
): RoleSkillState => ({
  id,
  level,
  requirement
});

// Level comparison utilities
export const getLevelPriority = (level: SkillLevel = 'unspecified'): number => {
  const priorities: { [key in SkillLevel]: number } = {
    'advanced': 0,
    'intermediate': 1,
    'beginner': 2,
    'unspecified': 3
  };
  return priorities[level];
};

export const compareSkillLevels = (a: SkillLevel, b: SkillLevel): number => {
  return getLevelPriority(a) - getLevelPriority(b);
};

// Type guards
export const isSkillLevel = (value: any): value is SkillLevel => {
  return ['advanced', 'intermediate', 'beginner', 'unspecified'].includes(value);
};

export const isEmployeeSkillRequirement = (value: any): value is EmployeeSkillRequirement => {
  return ['skill_goal', 'not_interested', 'unknown'].includes(value);
};

export const isRoleSkillRequirement = (value: any): value is RoleSkillRequirement => {
  return ['required', 'preferred'].includes(value);
};