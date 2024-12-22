export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';

export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';
export type RoleSkillRequirement = 'required' | 'preferred';

export interface BaseSkill {
  name: string;
  category?: SkillCategory;
  weight?: SkillWeight;
}

export interface UnifiedSkill {
  id?: string;
  title: string;
  subcategory: string;
  level?: string;
  growth: string;
  confidence: string;
  requirement?: RoleSkillRequirement;
  category?: string;
  weight?: string;
  businessCategory?: string;
  salary?: string;
  benchmarks?: { B: boolean; R: boolean; M: boolean; O: boolean };
}

export interface EmployeeSkillState {
  level: string;
  requirement: EmployeeSkillRequirement;
}

export interface RoleSkillState {
  id: string;
  level: string;
  requirement: RoleSkillRequirement;
}

export interface RoleState {
  [skillName: string]: {
    [level: string]: RoleSkillState;
  };
}

export interface RoleSkillData {
  title: string;
  specialized: UnifiedSkill[];
  common: UnifiedSkill[];
  certifications: UnifiedSkill[];
}