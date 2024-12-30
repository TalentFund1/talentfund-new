import { 
  SkillLevel, 
  SkillGoalStatus, 
  BaseSkill,
  SkillBenchmark,
  SkillMetrics,
  SkillWeight,
  SkillCategory,
  SkillRequirementLevel
} from '../../skills/types/sharedSkillTypes';

// Employee skill state
export interface EmployeeSkillState {
  level: SkillLevel;
  requirement: string;
  goalStatus?: SkillGoalStatus;
  lastUpdated: string;
  skillScore: number;
  inDevelopmentPlan: boolean;
  source?: string;
}

// Single skill update
export interface EmployeeSkillUpdate {
  level?: SkillLevel;
  goalStatus?: SkillGoalStatus;
  skillScore?: number;
  inDevelopmentPlan?: boolean;
  source?: string;
}

// Complete employee skill data
export interface EmployeeSkillData extends BaseSkill {
  employeeId: string;
  skillId: string;
  level: SkillLevel;
  goalStatus?: SkillGoalStatus;
  lastUpdated: string;
  minimumLevel?: SkillLevel;
  requirementLevel?: SkillRequirementLevel;
  metrics?: SkillMetrics;
  growth?: string;
  salary?: string;
  inDevelopmentPlan: boolean;
  benchmarks?: SkillBenchmark;
  weight: SkillWeight;
  category: SkillCategory;
  source?: string;
  skillScore?: number;
  requirement?: string;
}

// Achievement tracking
export interface EmployeeSkillAchievement extends EmployeeSkillData {
  growth: string;
}

// Complete employee skills data structure
export interface EmployeeSkillsData {
  employeeId: string;
  skills: EmployeeSkillAchievement[];
  states: Record<string, EmployeeSkillState>;
  lastUpdated?: string;
}

export type { 
  SkillLevel,
  SkillGoalStatus,
  SkillCategory,
  SkillWeight,
  SkillMetrics,
  SkillBenchmark,
  SkillRequirementLevel
};