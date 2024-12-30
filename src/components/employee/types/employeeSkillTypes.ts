import { 
  SkillLevel, 
  SkillGoalStatus, 
  BaseSkill, 
  SkillBenchmark, 
  SkillMetrics 
} from '../../skills/types/sharedSkillTypes';

export type { SkillLevel, SkillGoalStatus };

export type SkillSource = 'dialog' | 'checkbox' | undefined;

export interface EmployeeSkillState {
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
  skillScore: number;
  inDevelopmentPlan: boolean;
  source?: SkillSource;
}

export interface EmployeeSkillUpdate {
  level?: SkillLevel;
  goalStatus?: SkillGoalStatus;
  skillScore?: number;
  inDevelopmentPlan?: boolean;
  source?: SkillSource;
}

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
  source?: SkillSource;
}

export interface EmployeeSkillAchievement extends EmployeeSkillData {}

export interface EmployeeSkillsData {
  employeeId: string;
  skills: EmployeeSkillAchievement[];
  states: Record<string, EmployeeSkillState>;
  lastUpdated?: string;
}

console.log('Employee skill types defined with clear separation from role requirements');