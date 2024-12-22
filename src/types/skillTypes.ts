// Base skill types that don't depend on any other files
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';

// Separate employee and role requirements
export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';
export type RoleSkillRequirement = 'required' | 'preferred';

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