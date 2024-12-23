export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';

export interface BaseSkillState {
  id: string;
  skillId: string;
  level: string;
}

export interface EmployeeSkillState extends BaseSkillState {
  level: string;
}

export interface RoleSkillState extends BaseSkillState {
  level: string;
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
  setSkillState: (profileId: string, skillId: string, level: string) => void;
  initializeState: (profileId: string, skillId: string, initialLevel: string) => void;
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