export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillRequirement = 'required' | 'preferred' | 'skill_goal' | 'not_interested' | 'unknown';

export interface SkillState {
  level: string;
  required: string;
}

export interface LevelState {
  [levelKey: string]: SkillState;
}

export interface EmployeeSkillState {
  [skillName: string]: LevelState;
}

export interface RoleState {
  [employeeId: string]: EmployeeSkillState;
}

export interface CompetencyState {
  roleStates: Record<string, RoleState>;
  currentStates: Record<string, RoleState>;
  originalStates: Record<string, RoleState>;
  hasChanges: boolean;
  setSkillState: (
    skillName: string,
    level: string,
    levelKey: string,
    required: string,
    roleId: string,
    employeeId: string
  ) => void;
  setSkillProgression: (
    skillName: string,
    progression: Record<string, SkillState>,
    roleId: string,
    employeeId: string
  ) => void;
  resetLevels: (roleId: string, employeeId: string) => void;
  saveChanges: (roleId: string) => void;
  cancelChanges: (roleId: string) => void;
  initializeState: (roleId: string, employeeId: string) => void;
  getRoleState: (roleId: string, employeeId: string) => EmployeeSkillState;
}

// Base skill interface with common properties
export interface BaseSkill {
  id: string;
  title: string;
  subcategory: string;
  category: SkillCategory;
  businessCategory: string;
  weight: SkillWeight;
  level: string;
  growth: string;
  salary: string;
  confidence: 'low' | 'medium' | 'high';
  benchmarks: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
}

// Unified skill interface extending base skill with optional properties
export interface UnifiedSkill extends BaseSkill {
  requirement?: SkillRequirement;
  roleLevel?: string | null;
  isCompanySkill?: boolean;
}

// Employee skill interface for employee-specific skill data
export interface EmployeeSkill extends UnifiedSkill {
  requirement: SkillRequirement;
}

// Role skill interface for role-specific skill information
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

// Mapped skill interface for skill matrix display
export interface MappedSkill extends UnifiedSkill {
  requirement: SkillRequirement;
  roleLevel: string | null;
  isCompanySkill: boolean;
}

export interface DetailedSkill extends BaseSkill {
  level: string;
  isSkillGoal: boolean;
}

export interface SimpleSkill {
  title: string;
  level: string;
}

export interface RoleSkillData {
  title: string;
  specialized?: RoleSkill[];
  common?: RoleSkill[];
  certifications?: RoleSkill[];
}

export interface Skill extends BaseSkill {
  // Additional properties specific to the Skill interface if needed
}