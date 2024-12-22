// Base skill requirement types
export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';
export type RoleSkillRequirement = 'required' | 'preferred';

// Base skill state interface
interface BaseSkillState {
  level: string;
  requirement: EmployeeSkillRequirement | RoleSkillRequirement;
}

// Employee-specific skill state
export interface EmployeeSkillState extends BaseSkillState {
  requirement: EmployeeSkillRequirement;
}

// Role-specific skill state
export interface RoleSkillState extends BaseSkillState {
  requirement: RoleSkillRequirement;
}

// Unified skill interface from universal database
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

// Role skill data structure
export interface RoleSkillData {
  title: string;
  roleTrack?: "Professional" | "Managerial";
  specialized: UnifiedSkill[];
  common: UnifiedSkill[];
  certifications: UnifiedSkill[];
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