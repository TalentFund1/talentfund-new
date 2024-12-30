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
  requirement: SkillRequirementLevel;
  lastUpdated: string;
  skillScore: number;
}

// Employee skill data
export interface EmployeeSkillData extends BaseSkill {
  employeeId: string;
  skillId: string;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
  inDevelopmentPlan: boolean;
  benchmarks: SkillBenchmark;
}

// Achievement tracking
export interface EmployeeSkillAchievement extends EmployeeSkillData {
  metrics: SkillMetrics;
}

// Full employee skills data
export interface EmployeeSkillsData {
  employeeId: string;
  skills: EmployeeSkillAchievement[];
  states: Record<string, EmployeeSkillState>;
  lastUpdated?: string;
}