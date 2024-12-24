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

export interface EmployeeSkill extends BaseSkill {
  employeeId: string;
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
  benchmarks: SkillBenchmark;
  growth: string;
  salary: string;
  confidence: 'low' | 'medium' | 'high';
}

export interface EmployeeSkillAchievement extends EmployeeSkill {}

export interface EmployeeSkillsData {
  employeeId: string;
  skills: EmployeeSkillAchievement[];
  states: Record<string, SkillState>;
  lastUpdated?: string;
}

export interface EmployeeSkillsStore {
  employeeSkills: Record<string, EmployeeSkillsData>;
  initializeEmployeeSkills: (employeeId: string) => void;
  getEmployeeSkills: (employeeId: string) => EmployeeSkillAchievement[];
  getSkillState: (employeeId: string, skillTitle: string) => SkillState;
  setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => void;
  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: SkillGoalStatus) => void;
  batchUpdateSkills: (employeeId: string, updates: Record<string, SkillState>) => void;
}

console.log('Employee skill types updated to use shared interfaces');