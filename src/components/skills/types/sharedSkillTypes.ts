export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'unspecified';
export type SkillGoalStatus = 'required' | 'preferred' | 'not_interested' | 'unknown' | 'skill_goal';
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'technical' | 'critical' | 'important' | 'nice_to_have';

export interface BaseSkill {
  id?: string;
  title: string;
  subcategory: string;
  category: SkillCategory;
  businessCategory: string;
  weight: SkillWeight;
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
  level: SkillLevel;
  growth: string;
  salary: string;
  minimumLevel: SkillLevel;
  requirementLevel: 'required' | 'preferred' | 'optional';
  metrics: SkillMetrics;
  benchmarks?: SkillBenchmark;
  skillScore?: number;
}