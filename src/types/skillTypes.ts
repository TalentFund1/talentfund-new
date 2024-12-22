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

// Skill state type checking utilities
export const isEmployeeSkillState = (state: any): state is EmployeeSkillState => {
  return state && 
    typeof state.skillId === 'string' && 
    typeof state.level === 'string' && 
    isEmployeeRequirement(state.requirement);
};

export const isRoleSkillState = (state: any): state is RoleSkillState => {
  return state && 
    typeof state.id === 'string' && 
    typeof state.level === 'string' && 
    isRoleRequirement(state.requirement);
};

// Skill type conversion utilities
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