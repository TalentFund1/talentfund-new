export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillRequirement = 'required' | 'preferred' | 'not_interested' | 'unknown' | 'skill_goal';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'unspecified';
export type SkillRequirementLevel = 'required' | 'preferred' | 'optional';
export type SkillConfidence = 'low' | 'medium' | 'high';

// Employee skill state
export interface EmployeeSkillState {
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
  skillScore: number;
  inDevelopmentPlan: boolean;
}

// Single skill update
export interface EmployeeSkillUpdate {
  level?: SkillLevel;
  goalStatus?: SkillGoalStatus;
  skillScore?: number;
  inDevelopmentPlan?: boolean;
}

// Complete employee skill data
export interface EmployeeSkillData extends BaseSkill {
  employeeId: string;
  skillId: string;
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
  skillScore: number;
  minimumLevel: SkillLevel;
  requirementLevel: SkillRequirementLevel;
  metrics: SkillMetrics;
  growth: string;
  salary: string;
  confidence: SkillConfidence;
  inDevelopmentPlan: boolean;
  benchmarks: SkillBenchmark;
}

// Achievement tracking
export interface EmployeeSkillAchievement extends EmployeeSkillData {}

// Complete employee skills data structure
export interface EmployeeSkillsData {
  employeeId: string;
  skills: EmployeeSkillAchievement[];
  states: Record<string, EmployeeSkillState>;
  lastUpdated?: string;
}

export type { SkillLevel, SkillGoalStatus };