export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';
export type RoleSkillRequirement = 'required' | 'preferred';

export interface SkillState {
  level: string;
  required: string;
  requirement: EmployeeSkillRequirement;
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
  occupation?: string;  // Added occupation as optional property
}

export interface EmployeeSkill {
  title: string;
  subcategory: string;
  level: string;
  growth: string;
  confidence: string;
  requirement?: 'skill_goal' | 'not_interested' | 'unknown';
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
