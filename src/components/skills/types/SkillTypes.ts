import { 
  SkillLevel, 
  SkillGoalStatus,
  SkillRequirementLevel,
  SkillMetrics,
  SkillWeight,
  SkillCategory,
  BaseSkill
} from './sharedSkillTypes';

export type { SkillWeight, SkillCategory, RoleSkillData } from './roleSkillTypes';

export interface DetailedSkill {
  name: string;
  level: string;
  isSkillGoal: boolean;
}

export interface Skill extends BaseSkill {
  title: string;
  subcategory: string;
  category: SkillCategory;
  businessCategory: string;
  weight: SkillWeight;
  level: SkillLevel;
  growth: string;
  salary: string;
  skillScore: number;
  minimumLevel: SkillLevel;
  requirementLevel: SkillRequirementLevel;
  metrics: SkillMetrics;
  benchmarks: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
}

export interface UnifiedSkill extends Skill {
  goalStatus?: SkillGoalStatus;
  roleLevel?: string;
  isCompanySkill?: boolean;
}

export interface SimpleSkill {
  title: string;
  subcategory: string;
  businessCategory?: string;
  level: string;
  growth: string;
}