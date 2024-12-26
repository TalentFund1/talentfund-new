// Core skill types for employees
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'unspecified';
export type SkillGoalStatus = 'skill_goal' | 'not_interested' | 'unknown' | 'required' | 'preferred';

// Legacy status types for backward compatibility
export type LegacyGoalStatus = 'required' | 'preferred' | SkillGoalStatus;

// Employee skill state
export interface EmployeeSkillState {
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
  confidence: 'low' | 'medium' | 'high';
}

// Single skill update
export interface EmployeeSkillUpdate {
  level?: SkillLevel;
  goalStatus?: SkillGoalStatus | LegacyGoalStatus;
  confidence?: 'low' | 'medium' | 'high';
}

// Complete employee skill data
export interface EmployeeSkillData {
  id: string;
  employeeId: string;
  skillId: string;
  title: string;
  subcategory: string;
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
  category: 'specialized' | 'common' | 'certification';
  weight: 'critical' | 'technical' | 'necessary';
  businessCategory: string;
  growth: string;
  salary: string;
  confidence: 'low' | 'medium' | 'high';
  benchmarks: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
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

console.log('Employee skill types updated with complete interfaces');