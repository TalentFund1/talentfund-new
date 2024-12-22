// Basic type definitions
export type SkillRequirement = 'skill_goal' | 'not_interested' | 'unknown' | 'required' | 'preferred';

// Consolidated skill state interface
export interface SkillState {
  level: string;
  required: string;
  requirement: SkillRequirement;
  isEmployeeSkill?: boolean;  // Flag to differentiate between employee and role skills
}

// Consolidated skill interface
export interface UnifiedSkill {
  id?: string;
  title: string;
  subcategory: string;
  level: string;
  growth: string;
  confidence: string;
  category: 'specialized' | 'common' | 'certification';
  weight: 'critical' | 'technical' | 'necessary';
  businessCategory?: string;
  salary?: string;
  benchmarks?: { [key: string]: boolean };
  requirement?: SkillRequirement;
  isSkillGoal?: boolean;
}

// Profile data structure
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

// Role-specific data structure
export interface RoleSkillData {
  title: string;
  roleTrack?: "Professional" | "Managerial";
  soc?: string;
  function?: string;
  mappedTitle?: string;
  occupation?: string;
  description?: string;
  specialized: UnifiedSkill[];
  common: UnifiedSkill[];
  certifications: UnifiedSkill[];
  skills?: UnifiedSkill[];
}

console.log('Consolidated skill types loaded:', {
  totalTypes: 4,
  types: ['SkillRequirement', 'SkillState', 'UnifiedSkill', 'RoleSkillData']
});