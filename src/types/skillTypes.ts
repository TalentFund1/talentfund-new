export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';
export type RoleSkillRequirement = 'required' | 'preferred';

export interface EmployeeSkillState {
  skillId: string;
  level: string;
  requirement: EmployeeSkillRequirement;
}

export interface RoleSkillState {
  id: string;
  level: string;
  requirement: RoleSkillRequirement;
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

// Level priority helper
export const getLevelPriority = (level: string = 'unspecified'): number => {
  const priorities: { [key: string]: number } = {
    'advanced': 0,
    'intermediate': 1,
    'beginner': 2,
    'unspecified': 3
  };
  return priorities[level.toLowerCase()] ?? 3;
};

// Type conversion utilities
export const convertEmployeeToRoleState = (employeeState: EmployeeSkillState): RoleSkillState => ({
  id: employeeState.skillId,
  level: employeeState.level,
  requirement: employeeState.requirement === 'skill_goal' ? 'required' : 'preferred'
});

export const convertRoleToEmployeeState = (roleState: RoleSkillState): EmployeeSkillState => ({
  skillId: roleState.id,
  level: roleState.level,
  requirement: roleState.requirement === 'required' ? 'skill_goal' : 'unknown'
});

// Type checking utilities
export const getSkillStateLevel = (state: EmployeeSkillState | RoleSkillState | string): string => {
  if (typeof state === 'string') return state;
  return state.level || 'unspecified';
};

export const getSkillStateRequirement = (
  state: EmployeeSkillState | RoleSkillState
): EmployeeSkillRequirement | RoleSkillRequirement => {
  return state.requirement;
};

// Helper functions for type-safe comparisons
export const compareSkillLevels = (
  level1: string | EmployeeSkillState | RoleSkillState,
  level2: string | EmployeeSkillState | RoleSkillState
): boolean => {
  const l1 = getSkillStateLevel(level1);
  const l2 = getSkillStateLevel(level2);
  return l1.toLowerCase() === l2.toLowerCase();
};

export const isSkillGoal = (state: EmployeeSkillState): boolean => {
  return state.requirement === 'skill_goal';
};

export const isRequiredSkill = (state: RoleSkillState): boolean => {
  return state.requirement === 'required';
};