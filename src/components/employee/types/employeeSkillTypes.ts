import { 
  SkillLevel, 
  SkillGoalStatus, 
  SkillCategory, 
  SkillWeight,
  BaseSkill,
  SkillState,
  SkillBenchmark,
  SkillMetrics
} from '../../skills/types/sharedSkillTypes';

// Core employee skill state
export interface EmployeeSkillState {
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
  confidence: 'low' | 'medium' | 'high';
}

// Update for a single skill
export interface EmployeeSkillUpdate {
  level?: SkillLevel;
  goalStatus?: SkillGoalStatus;
  confidence?: 'low' | 'medium' | 'high';
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

// State management for employee skills
export interface EmployeeSkillsState {
  skills: Record<string, EmployeeSkillData>;
  lastUpdated: string;
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