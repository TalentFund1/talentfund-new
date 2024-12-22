// Basic type definitions
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';
export type RoleSkillRequirement = 'required' | 'preferred';
export type SkillLevel = 'advanced' | 'intermediate' | 'beginner' | 'unspecified';

// Core state interfaces
export interface BaseSkillState {
  level: SkillLevel;
  requirement?: EmployeeSkillRequirement | RoleSkillRequirement;
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
  level: string;
  isSkillGoal: boolean;
}

// Helper functions
export const getSkillLevel = (state: EmployeeSkillState | RoleSkillState): SkillLevel => {
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
  level: SkillLevel = 'unspecified',
  requirement: EmployeeSkillRequirement = 'unknown'
): EmployeeSkillState => ({
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