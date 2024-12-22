// Base skill types from universal database
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

// Skill categories and weights from universal database
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';

// Employee-specific types
export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';

export interface EmployeeSkillState {
  level: string;
  requirement: EmployeeSkillRequirement;
  required?: string; // For backward compatibility
}

export interface EmployeeSkillRecord {
  [skillTitle: string]: EmployeeSkillState;
}

// Role-specific types
export type RoleSkillRequirement = 'required' | 'preferred' | 'not_interested' | 'skill_goal' | 'unknown';

export interface RoleSkillState {
  level: string;
  requirement: RoleSkillRequirement;
  required?: string; // For backward compatibility
}

export interface RoleState {
  [skillName: string]: {
    [levelKey: string]: RoleSkillState;
  };
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