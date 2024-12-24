import { 
  SkillCategory, 
  SkillWeight,
  SkillBenchmark,
  SkillMetrics
} from '../../skills/types/sharedSkillTypes';

// Core skill types
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'unspecified';
export type SkillGoalStatus = 'required' | 'preferred' | 'not_interested' | 'unknown' | 'skill_goal';

// Core employee skill state
export interface EmployeeSkillState {
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
  confidence: 'low' | 'medium' | 'high';
}

// Complete employee skill data
export interface EmployeeSkillData {
  employeeId: string;
  skillId: string;
  title: string;
  subcategory: string;
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
  category: SkillCategory;
  weight: SkillWeight;
  businessCategory: string;
  growth: string;
  salary: string;
  confidence: 'low' | 'medium' | 'high';
  benchmarks: SkillBenchmark;
}

// Achievement tracking
export interface EmployeeSkillAchievement extends EmployeeSkillData {
  id: string; // Added to match UnifiedSkill interface
}

// Complete employee skills data structure
export interface EmployeeSkillsData {
  employeeId: string;
  skills: EmployeeSkillAchievement[];
  states: Record<string, EmployeeSkillState>;
  lastUpdated?: string;
}

console.log('Employee skill types updated with complete interfaces');