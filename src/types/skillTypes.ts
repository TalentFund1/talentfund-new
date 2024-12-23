export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type SkillLevel = 'advanced' | 'intermediate' | 'beginner' | 'unspecified';

export interface BaseSkillState {
  id: string;
  skillId: string;
  level: SkillLevel;
}

export interface EmployeeSkillState extends BaseSkillState {
  level: SkillLevel;
}

export interface RoleSkillState extends BaseSkillState {
  level: SkillLevel;
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