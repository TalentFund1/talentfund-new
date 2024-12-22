// Basic skill types
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'unspecified';

export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';
export type RoleSkillRequirement = 'required' | 'preferred' | 'optional';

export interface SkillState {
  level: string;
  requirement?: RoleSkillRequirement;
}

export interface RoleSkillState {
  level: string;
  requirement: RoleSkillRequirement;
}

export interface EmployeeSkillState {
  level: string;
  requirement: EmployeeSkillRequirement;
}

export interface UnifiedSkill {
  title: string;
  subcategory: string;
  level?: string;
  growth: string;
  confidence?: string;
  salary?: string;
  category?: string;
  weight?: string;
  type?: string;
}

export interface RoleSkillData {
  title: string;
  roleTrack: 'Professional' | 'Managerial';
  specialized: UnifiedSkill[];
  common: UnifiedSkill[];
  certifications: UnifiedSkill[];
  skills: UnifiedSkill[];
  description?: string;
}

// Component-specific types
export interface DetailedSkill {
  name: string;
  level: string;
  isSkillGoal: boolean;
}

export interface EmployeeSkill {
  title: string;
  subcategory: string;
  level: string;
  growth: string;
  confidence: string;
  requirement?: EmployeeSkillRequirement;
}

export interface RoleSkill {
  title: string;
  subcategory: string;
  level?: string;
  growth: string;
  confidence?: string;
  requirement?: RoleSkillRequirement;
  salary?: string;
  benchmarks?: { [key: string]: boolean };
}

// Helper functions to convert between requirement types
export const convertToEmployeeRequirement = (roleReq: RoleSkillRequirement): EmployeeSkillRequirement => {
  switch (roleReq) {
    case 'required':
      return 'skill_goal';
    case 'preferred':
      return 'skill_goal';
    default:
      return 'unknown';
  }
};

export const convertToRoleRequirement = (empReq: EmployeeSkillRequirement): RoleSkillRequirement => {
  switch (empReq) {
    case 'skill_goal':
      return 'required';
    case 'not_interested':
      return 'optional';
    default:
      return 'preferred';
  }
};