export type SkillCategory = 'specialized' | 'common' | 'certification' | 'all';
export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type SkillRequirement = 'required' | 'preferred' | 'optional';

export interface UnifiedSkill {
  id: string;
  title: string;
  subcategory: string;
  category: string;
  businessCategory: string;
  weight: string;
  level: string;
  growth: string;
  salary: string;
  confidence: string;
  benchmarks: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
}

export interface SkillState {
  level: string;
  requirement: EmployeeSkillRequirement;
}

export interface RoleSkillState extends SkillState {
  id: string;
}

export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';
export type RoleSkillRequirement = 'required' | 'preferred' | 'not-interested';

export interface RoleState {
  [level: string]: RoleSkillState;
}