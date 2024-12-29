import { 
  SkillLevel, 
  SkillGoalStatus, 
  BaseSkill, 
  SkillBenchmark, 
  SkillMetrics 
} from './sharedSkillTypes';

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
  goalStatus?: SkillGoalStatus;
  confidence?: 'low' | 'medium' | 'high';
}

// Complete employee skill data
export interface EmployeeSkillData extends BaseSkill {
  employeeId: string;
  skillId: string;
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
  benchmarks: SkillBenchmark;
  metrics: SkillMetrics;
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

console.log('Employee skill types defined with clear separation from role requirements');