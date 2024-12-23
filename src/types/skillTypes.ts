export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'unspecified';

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

export interface UnifiedSkill extends BaseSkill {}

export interface EmployeeSkillState {
  id: string;
  skillId: string;
  level: string;
}

export interface RoleSkillState {
  id: string;
  skillId: string;
  level: SkillLevel;
}

export interface RoleState {
  [level: string]: RoleSkillState;
}

export interface SkillsMatrixState {
  skillStates: Record<string, Record<string, EmployeeSkillState>>;
  currentStates: Record<string, Record<string, EmployeeSkillState>>;
  hasChanges: boolean;
  setSkillState: (profileId: string, skillId: string, level: string) => void;
  initializeState: (profileId: string, skillId: string, initialLevel: string) => void;
  getSkillState: (profileId: string, skillId: string) => EmployeeSkillState | undefined;
  saveChanges: () => void;
  cancelChanges: () => void;
}