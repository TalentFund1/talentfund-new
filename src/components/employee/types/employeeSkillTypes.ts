import { 
  SkillLevel, 
  SkillGoalStatus, 
  BaseSkill, 
  SkillBenchmark, 
  SkillMetrics 
} from '../../skills/types/sharedSkillTypes';

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
  minimumLevel: SkillLevel;
  requirementLevel: 'required' | 'preferred' | 'optional';
  metrics: SkillMetrics;
  growth: string;
  salary: string;
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