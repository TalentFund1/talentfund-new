// Base skill types from universal database
export interface UnifiedSkill {
  id: string;
  title: string;
  subcategory: string;
  category: 'specialized' | 'common' | 'certification';
  businessCategory: string;
  weight: 'critical' | 'technical' | 'necessary';
  level: string;
  growth: string;
  salary: string;
  confidence: string;
  benchmarks: { [key: string]: boolean };
}

// Role-specific types
export type RoleSkillRequirement = 'required' | 'preferred';

export interface RoleSkillState {
  level: string;
  required: RoleSkillRequirement;
}

export interface RoleState {
  [skillName: string]: {
    [levelKey: string]: RoleSkillState;
  };
}

// Employee-specific types
export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';

export interface EmployeeSkillState {
  level: string;
  requirement: EmployeeSkillRequirement;
}

export interface EmployeeSkillRecord {
  [skillTitle: string]: EmployeeSkillState;
}

// Role data structure
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

// Profile row type for UI
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