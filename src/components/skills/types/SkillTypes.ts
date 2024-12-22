export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';
export type RoleSkillRequirement = 'required' | 'preferred';

export interface BaseSkillState {
  level: string;
  required: string;
}

export interface EmployeeSkillState extends BaseSkillState {
  requirement: EmployeeSkillRequirement;
}

export interface RoleSkillState extends BaseSkillState {
  requirement: RoleSkillRequirement;
}

export interface DetailedSkill {
  name: string;
  level: string;
  isSkillGoal: boolean;
}

export interface Certification {
  name: string;
  level: string;
  isSkillGoal: boolean;
}

export interface SkillProfileRow {
  id: string;
  name: string;
  function: string;
  skillCount: string;
  employees: string;
  matches: string;
  lastUpdated: string;
  occupation?: string;
}

export interface UnifiedSkill {
  id?: string;
  title: string;
  subcategory: string;
  level: string;
  growth: string;
  confidence: string;
  requirement?: EmployeeSkillRequirement;
  category?: string;
  weight?: string;
  businessCategory?: string;
  salary?: string;
  benchmarks?: { [key: string]: boolean };
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

export interface RoleSkillData {
  title: string;
  roleTrack?: "Professional" | "Managerial";
  specialized: RoleSkill[];
  common: RoleSkill[];
  certifications: RoleSkill[];
}