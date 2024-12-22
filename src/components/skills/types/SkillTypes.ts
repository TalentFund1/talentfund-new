export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';
export type RoleSkillRequirement = 'required' | 'preferred';

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
  requirement?: EmployeeSkillRequirement;
}

export interface EmployeeSkillState {
  level: string;
  requirement: EmployeeSkillRequirement;
}

export interface RoleSkillState {
  level: string;
  requirement: RoleSkillRequirement;
}

export interface RoleState {
  [skillName: string]: {
    [levelKey: string]: RoleSkillState;
  };
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

export interface BaseSkill {
  name: string;
}

export interface DetailedSkill extends BaseSkill {
  level: string;
  isSkillGoal: boolean;
}

export interface Certification extends BaseSkill {
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

export interface EmployeeSkill {
  title: string;
  subcategory: string;
  level: string;
  growth: string;
  confidence: string;
  requirement?: 'required' | 'preferred' | 'skill_goal';
}

export interface RoleSkill {
  title: string;
  subcategory: string;
  level?: string;
  growth: string;
  confidence?: string;
  requirement?: string;
  salary?: string;
  benchmarks?: { [key: string]: boolean };
}