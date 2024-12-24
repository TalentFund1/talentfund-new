// Basic skill-related enums and types
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'unspecified';
export type SkillGoalStatus = 'required' | 'preferred' | 'not_interested' | 'unknown' | 'skill_goal';
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type SkillRequirementLevel = 'required' | 'preferred' | 'optional';

// Base skill interface
export interface BaseSkill {
  id: string;
  title: string;
  category: SkillCategory;
  subcategory: string;
  weight: SkillWeight;
  businessCategory: string;
}

// Skill state tracking
export interface SkillState {
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
}

// Skill benchmarking data
export interface SkillBenchmark {
  B: boolean;
  R: boolean;
  M: boolean;
  O: boolean;
}

// Skill metrics
export interface SkillMetrics {
  growth: string;
  salary: string;
  confidence: 'low' | 'medium' | 'high';
}

// Employee skill state
export interface EmployeeSkillState {
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
}

// Skill comparison interface
export interface SkillComparison {
  skillTitle: string;
  employeeLevel: SkillLevel;
  requiredLevel: SkillLevel;
  goalStatus: SkillGoalStatus;
  matchPercentage: number;
}

console.log('Shared skill types loaded and available for use');