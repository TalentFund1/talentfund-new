export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'unspecified';
export type SkillGoalStatus = 'required' | 'preferred' | 'not_interested' | 'unknown' | 'skill_goal';
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'technical' | 'critical' | 'important' | 'nice_to_have' | 'necessary';
export type Track = 'Professional' | 'Managerial';
export type SkillRequirementLevel = 'required' | 'preferred' | 'optional';

export interface BaseSkill {
  id?: string;
  title: string;
  subcategory: string;
  category: SkillCategory;
  businessCategory: string;
  weight: SkillWeight;
  level?: SkillLevel;
  salary?: string;
  skillScore?: number;
  minimumLevel?: SkillLevel;
  requirementLevel?: SkillRequirementLevel;
}

export interface SkillBenchmark {
  B: boolean;
  R: boolean;
  M: boolean;
  O: boolean;
}

export interface SkillMetrics {
  growth: string;
  salary: string;
  skillScore: number;
}

export interface UnifiedSkill extends BaseSkill {
  growth: string;
  metrics?: SkillMetrics;
  benchmarks?: SkillBenchmark;
  hasSkill?: boolean;
}