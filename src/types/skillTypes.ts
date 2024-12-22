// Base skill types
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';

// Employee skill requirements - for individual skill goals/interests
export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';

// Role skill requirements - for role-level requirements
export type RoleSkillRequirement = 'required' | 'preferred';

// Base skill state interface
interface BaseSkillState {
  level: string;
}

// Employee-specific skill state
export interface EmployeeSkillState extends BaseSkillState {
  requirement: EmployeeSkillRequirement;
}

// Role-specific skill state
export interface RoleSkillState extends BaseSkillState {
  requirement: RoleSkillRequirement;
}

// Role state structure
export interface RoleState {
  [skillName: string]: {
    [levelKey: string]: RoleSkillState;
  };
}

// Unified skill interface for shared properties
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

// Role skill data structure
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