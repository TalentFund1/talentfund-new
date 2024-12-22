// Base skill types
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';

// Employee skill requirements
export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';
export type RoleSkillRequirement = 'preferred' | 'required';

// Base interfaces
export interface BaseSkillState {
  level: string;
}

export interface EmployeeSkillState extends BaseSkillState {
  requirement: EmployeeSkillRequirement;
}

export interface RoleSkillState extends BaseSkillState {
  requirement: RoleSkillRequirement;
}

export interface SkillState extends BaseSkillState {
  requirement: EmployeeSkillRequirement | RoleSkillRequirement;
}

export interface RoleState {
  [skillName: string]: {
    [levelKey: string]: RoleSkillState;
  };
}

export interface UnifiedSkill {
  id: string;
  title: string;
  subcategory: string;
  category: SkillCategory;
  businessCategory: string;
  weight: SkillWeight;
  level: string;
  growth: string;
  salary: string;
  confidence: string;
  benchmarks: { [key: string]: boolean };
}

export interface RoleSkillData {
  title: string;
  roleTrack: "Professional" | "Managerial";
  specialized: UnifiedSkill[];
  common: UnifiedSkill[];
  certifications: UnifiedSkill[];
  skills: UnifiedSkill[];
  soc?: string;
  function?: string;
  mappedTitle?: string;
  occupation?: string;
  description?: string;
}