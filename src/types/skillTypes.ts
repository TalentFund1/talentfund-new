export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';

// Employee skill types
export type EmployeeSkillRequirement = 'skill_goal' | 'not_interested' | 'unknown';

// Role skill types
export type RoleSkillRequirement = 'required' | 'preferred';

export interface BaseSkill {
  name: string;
  category?: SkillCategory;
  weight?: SkillWeight;
}

export interface UnifiedSkill {
  id?: string;
  title: string;
  subcategory: string;
  level?: string;
  growth: string;
  confidence: string;
  requirement?: RoleSkillRequirement | EmployeeSkillRequirement;
  category?: string;
  weight?: string;
  businessCategory?: string;
  salary?: string;
  benchmarks?: { [key: string]: boolean };
}

export interface EmployeeSkillState {
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

// Skill state conversion utilities
export const convertToRoleSkillState = (state: EmployeeSkillState): RoleSkillState => {
  return {
    id: Date.now().toString(),
    level: state.level,
    requirement: state.requirement === 'skill_goal' ? 'required' : 'preferred'
  };
};

export const convertToEmployeeSkillState = (state: RoleSkillState): EmployeeSkillState => {
  return {
    level: state.level,
    requirement: state.requirement === 'required' ? 'skill_goal' : 'unknown'
  };
};