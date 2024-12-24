/**
 * Shared skill level types used across employee and role contexts
 */
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'unspecified';
export type SkillGoalStatus = 'required' | 'preferred' | 'not_interested' | 'unknown' | 'skill_goal';
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';

/**
 * Base interface for any skill in the system
 */
export interface BaseSkill {
  id: string;
  title: string;
  category: SkillCategory;
  subcategory: string;
  weight: SkillWeight;
  businessCategory: string;
}

/**
 * Interface for skill state tracking
 */
export interface SkillState {
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
}

/**
 * Interface for skill benchmarking data
 */
export interface SkillBenchmark {
  B: boolean;
  R: boolean;
  M: boolean;
  O: boolean;
}

/**
 * Interface for skill metrics
 */
export interface SkillMetrics {
  growth: string;
  salary: string;
  confidence: 'low' | 'medium' | 'high';
}

/**
 * Interface for comparing employee skills against role requirements
 */
export interface SkillComparison {
  skillTitle: string;
  employeeLevel: SkillLevel;
  requiredLevel: SkillLevel;
  goalStatus: SkillGoalStatus;
  matchPercentage: number;
}

/**
 * Interface for skill initialization options
 */
export interface SkillInitializationOptions {
  defaultLevel?: SkillLevel;
  defaultGoalStatus?: SkillGoalStatus;
  includeMetrics?: boolean;
  includeBenchmarks?: boolean;
}

console.log('Shared skill types loaded and available for use');