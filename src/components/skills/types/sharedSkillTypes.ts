// Basic skill levels and statuses
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'unspecified';
export type SkillGoalStatus = 'required' | 'preferred' | 'not_interested' | 'unknown' | 'skill_goal';
export type SkillRequirementLevel = 'required' | 'preferred' | 'optional';
export type Track = "Professional" | "Managerial";

// Base skill interface shared between roles and employees
export interface BaseSkill {
  id: string;
  title: string;
  category: SkillCategory;
  subcategory: string;
  weight: SkillWeight;
  businessCategory: string;
  skillScore?: number;
}

// Common types
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';

// Skill benchmarking data
export interface SkillBenchmark {
  B: boolean;
  R: boolean;
  M: boolean;
  O: boolean;
}

// Skill metrics shared between roles and employees
export interface SkillMetrics {
  growth: string;
  salary: string;
  confidence: 'low' | 'medium' | 'high';
  skillScore?: number;
}