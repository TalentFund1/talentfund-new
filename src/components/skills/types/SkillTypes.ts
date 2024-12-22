export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillRequirement = 'required' | 'preferred' | 'skill_goal' | 'not_interested' | 'unknown';

export interface SkillState {
  level: string;
  required: string;
  requirement: SkillRequirement;
}

export interface LevelState {
  [key: string]: SkillState;
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

export interface BaseSkill {
  id: string;
  title: string;
  name: string;
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

export interface UnifiedSkill extends BaseSkill {
  requirement?: SkillRequirement;
  roleLevel?: string | null;
  isCompanySkill?: boolean;
}

export interface RoleSkillData {
  title: string;
  specialized: RoleSkill[];
  common: RoleSkill[];
  certifications: RoleSkill[];
  skills: RoleSkill[];
  soc: string;
  function: string;
  mappedTitle: string;
  occupation: string;
  description: string;
  roleTrack: "Professional" | "Managerial";
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

export interface DetailedSkill extends BaseSkill {
  level: string;
  isSkillGoal: boolean;
}

export interface SimpleSkill extends BaseSkill {
  subcategory: string;
  businessCategory: string;
  growth: string;
}

export interface Certification extends DetailedSkill {
  // Additional certification-specific properties if needed
}

export type MappedSkill = UnifiedSkill;

export type Skill = BaseSkill;