// Basic type definitions
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';
export type RoleSkillRequirement = 'required' | 'preferred';
export type SkillLevel = 'advanced' | 'intermediate' | 'beginner' | 'unspecified';

// Core state interfaces
export interface BaseSkillState {
  level: SkillLevel | string;
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

export interface SkillState extends BaseSkillState {
  id: string;
  requirement: RoleSkillRequirement;
}

// Skill data interfaces
export interface DetailedSkill {
  name: string;
  level: string;
  isSkillGoal: boolean;
}

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

// Type guard utilities
export const isEmployeeRequirement = (req: any): req is EmployeeSkillRequirement => {
  return ['skill_goal', 'not_interested', 'unknown'].includes(req);
};

export const isRoleRequirement = (req: any): req is RoleSkillRequirement => {
  return ['required', 'preferred'].includes(req);
};

// Helper functions
export const getSkillLevel = (state: EmployeeSkillState | RoleSkillState | string): string => {
  if (typeof state === 'string') return state;
  return state.level?.toString() || 'unspecified';
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

// Level comparison utilities
export const getLevelPriority = (level: string = 'unspecified'): number => {
  const priorities: { [key: string]: number } = {
    'advanced': 0,
    'intermediate': 1,
    'beginner': 2,
    'unspecified': 3
  };
  return priorities[level.toLowerCase()] ?? 3;
};

export const compareSkillLevels = (level1: string, level2: string): boolean => {
  return getLevelPriority(level1) === getLevelPriority(level2);
};