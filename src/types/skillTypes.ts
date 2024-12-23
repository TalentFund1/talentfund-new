export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';

// Employee skill requirements - for individual skill goals/interests
export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';

// Role skill requirements - for role-level requirements
export type RoleSkillRequirement = 'required' | 'preferred';

// Base skill state interface
export interface BaseSkillState {
  id: string;
  level: string;
}

// Employee-specific skill state
export interface EmployeeSkillState extends BaseSkillState {
  id: string;
  level: string;
  requirement: EmployeeSkillRequirement;
}

// Role-specific skill state
export interface RoleSkillState extends BaseSkillState {
  id: string;
  level: string;
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
  requirement?: EmployeeSkillRequirement;
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

// Detailed skill interface
export interface DetailedSkill extends BaseSkillState {
  id: string;
  name: string;
  level: string;
  isSkillGoal: boolean;
}

// Skill state type
export interface SkillState {
  id: string;
  level: string;
  requirement: RoleSkillRequirement;
}