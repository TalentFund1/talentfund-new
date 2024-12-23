export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';
export type RoleSkillRequirement = 'required' | 'preferred';

export interface BaseSkillState {
  id: string;
  level: string;
}

export interface EmployeeSkillState extends BaseSkillState {
  profileId?: string;
  skillId: string;
  requirement: EmployeeSkillRequirement;
}

export interface RoleSkillState extends BaseSkillState {
  roleId?: string;
  skillId: string;
  requirement: RoleSkillRequirement;
}

export interface RoleState {
  [skillName: string]: {
    [level: string]: RoleSkillState;
  };
}

export interface SkillsMatrixState {
  skillStates: Record<string, Record<string, EmployeeSkillState>>;
  currentStates: Record<string, EmployeeSkillState>;
  hasChanges: boolean;
  setSkillState: (profileId: string, skillId: string, level: string, requirement: EmployeeSkillRequirement) => void;
  initializeState: (profileId: string, skillId: string, initialLevel: string, initialRequirement: EmployeeSkillRequirement) => void;
  getSkillState: (profileId: string, skillId: string) => EmployeeSkillState | undefined;
  saveChanges: () => void;
  cancelChanges: () => void;
}

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
  benchmarks?: {
    B?: boolean;
    R?: boolean;
    M?: boolean;
    O?: boolean;
  };
}

export interface RoleSkillData {
  title: string;
  specialized: UnifiedSkill[];
  common: UnifiedSkill[];
  certifications: UnifiedSkill[];
}

// Utility functions for requirement mapping
export const mapEmployeeToRoleRequirement = (requirement: EmployeeSkillRequirement): RoleSkillRequirement => {
  switch (requirement) {
    case 'skill_goal':
      return 'required';
    case 'not_interested':
    case 'unknown':
    default:
      return 'preferred';
  }
};

export const mapRoleToEmployeeRequirement = (requirement: RoleSkillRequirement): EmployeeSkillRequirement => {
  switch (requirement) {
    case 'required':
      return 'skill_goal';
    case 'preferred':
    default:
      return 'unknown';
  }
};