export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'unspecified';
export type SkillGoalStatus = 'required' | 'preferred' | 'not_interested' | 'unknown' | 'skill_goal';

// Employee skill state
export interface EmployeeSkillState {
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
  confidence: 'low' | 'medium' | 'high';
  skillScore: number;
  inDevelopmentPlan: boolean;
}

// Single skill update
export interface EmployeeSkillUpdate {
  level?: SkillLevel;
  goalStatus?: SkillGoalStatus;
  confidence?: 'low' | 'medium' | 'high';
  skillScore?: number;
  inDevelopmentPlan?: boolean;
}

// Complete employee skill data
export interface EmployeeSkillData {
  id: string;
  employeeId: string;
  skillId: string;
  title: string;
  subcategory: string;
  category: 'specialized' | 'common' | 'certification';
  businessCategory: string;
  weight: 'critical' | 'technical' | 'necessary';
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
  confidence: 'low' | 'medium' | 'high';
  skillScore: number;
  inDevelopmentPlan: boolean;
  minimumLevel: SkillLevel;
  requirementLevel: 'required' | 'preferred' | 'optional';
  metrics: {
    growth: string;
    salary: string;
    confidence: 'low' | 'medium' | 'high';
    skillScore: number;
  };
  benchmarks: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
  growth: string;
  salary: string;
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

console.log('Employee skill types defined with complete interfaces');