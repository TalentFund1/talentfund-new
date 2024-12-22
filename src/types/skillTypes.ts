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

// Helper function to check if a requirement is an employee requirement
export const isEmployeeRequirement = (req: any): req is EmployeeSkillRequirement => {
  return ['skill_goal', 'not_interested', 'unknown'].includes(req);
};

// Helper function to check if a requirement is a role requirement
export const isRoleRequirement = (req: any): req is RoleSkillRequirement => {
  return ['required', 'preferred'].includes(req);
};

// Helper function to get level priority
export const getLevelPriority = (level: string = 'unspecified'): number => {
  const priorities: { [key: string]: number } = {
    'advanced': 0,
    'intermediate': 1,
    'beginner': 2,
    'unspecified': 3
  };
  return priorities[level.toLowerCase()] ?? 3;
};