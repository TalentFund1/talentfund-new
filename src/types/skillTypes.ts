export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';
export type RoleSkillRequirement = 'required' | 'preferred';
export type SkillLevel = 'unspecified' | 'beginner' | 'intermediate' | 'advanced';

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
  confidence: string;
  benchmarks?: {
    B?: boolean;
    R?: boolean;
    M?: boolean;
    O?: boolean;
  };
}

export interface UnifiedSkill extends BaseSkill {
  requirement?: RoleSkillRequirement;
}

export interface EmployeeSkillState {
  employeeId: string;
  skillId: string;
  level: string;
  requirement: EmployeeSkillRequirement;
}

export interface RoleSkillState {
  id: string;
  level: string;
  requirement: RoleSkillRequirement;
}

export interface RoleState {
  [skillName: string]: {
    [level: string]: RoleSkillState;
  };
}

export interface SkillsMatrixState {
  skillStates: {
    [employeeId: string]: {
      [skillId: string]: EmployeeSkillState;
    };
  };
  currentStates: {
    [employeeId: string]: {
      [skillId: string]: EmployeeSkillState;
    };
  };
  hasChanges: boolean;
  setSkillState: (
    employeeId: string, 
    skillId: string, 
    level: string, 
    requirement: EmployeeSkillRequirement
  ) => void;
  initializeState: (
    employeeId: string, 
    skillId: string, 
    initialLevel: string, 
    initialRequirement: EmployeeSkillRequirement
  ) => void;
  getSkillState: (employeeId: string, skillId: string) => EmployeeSkillState | undefined;
  saveChanges: () => void;
  cancelChanges: () => void;
}

export interface RoleSkillData {
  title: string;
  specialized: UnifiedSkill[];
  common: UnifiedSkill[];
  certifications: UnifiedSkill[];
}