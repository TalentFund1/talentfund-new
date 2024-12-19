export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillRequirement = 'required' | 'preferred' | 'skill_goal' | 'not_interested' | 'unknown';
export type SkillLevel = 'unspecified' | 'beginner' | 'intermediate' | 'advanced';

export interface DetailedSkill {
  name: string;
  level: string;
  isSkillGoal: boolean;
}

export interface Skill {
  id: string;
  title: string;
  subcategory: string;
  category: SkillCategory;
  businessCategory: string;
  weight: SkillWeight;
  level: SkillLevel;
  growth: string;
  salary: string;
  confidence: 'low' | 'medium' | 'high';
  benchmarks: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
  isCompanySkill?: boolean;
}

export interface UnifiedSkill extends Skill {
  requirement?: SkillRequirement;
  roleLevel?: string;
}

export interface RoleSkillData {
  title: string;
  specialized: UnifiedSkill[];
  common: UnifiedSkill[];
  certifications: UnifiedSkill[];
  soc?: string;
}

export interface SimpleSkill {
  title: string;
  subcategory: string;
  category?: string;
  businessCategory?: string;
  level: string;
  growth: string;
}

export interface EmployeeSkill {
  title: string;
  subcategory: string;
  level: SkillLevel;
  growth: string;
  confidence: string;
  requirement?: SkillRequirement;
}

export interface SkillState {
  level: SkillLevel;
  required: SkillRequirement;
}

export interface LevelState {
  [key: string]: SkillState;
}

export interface RoleState {
  [skillName: string]: LevelState;
}

export interface EmployeeState {
  [skillName: string]: SkillState;
}