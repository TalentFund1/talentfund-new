export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';
export type RoleSkillRequirement = 'required' | 'preferred';

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
  profileId: string;
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

export interface RoleSkillData {
  title: string;
  specialized: UnifiedSkill[];
  common: UnifiedSkill[];
  certifications: UnifiedSkill[];
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