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

export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';
export type RoleSkillRequirement = 'required' | 'preferred';

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
  soc?: string;
  function?: string;
  mappedTitle?: string;
  occupation?: string;
  description?: string;
}