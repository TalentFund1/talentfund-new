import { SkillCategory, SkillWeight } from '../../skills/types/SkillTypes';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'unspecified';
export type SkillGoalStatus = 'skill_goal' | 'not_interested' | 'unknown';
export type SkillRequirementLevel = 'required' | 'preferred' | 'optional';

export interface EmployeeSkillState {
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
  skillScore: number;
  inDevelopmentPlan: boolean;
}

export interface EmployeeSkillUpdate {
  level?: SkillLevel;
  goalStatus?: SkillGoalStatus;
  skillScore?: number;
  inDevelopmentPlan?: boolean;
}

export interface EmployeeSkillData {
  id: string;
  employeeId: string;
  skillId: string;
  title: string;
  subcategory: string;
  category: SkillCategory;
  businessCategory: string;
  weight: SkillWeight;
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
  skillScore: number;
  minimumLevel: SkillLevel;
  requirementLevel: SkillRequirementLevel;
  metrics: {
    growth: string;
    salary: string;
    skillScore: number;
  };
  growth: string;
  salary: string;
  inDevelopmentPlan: boolean;
  benchmarks: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
}

export interface EmployeeSkillAchievement extends EmployeeSkillData {}

export interface EmployeeSkillsData {
  employeeId: string;
  skills: EmployeeSkillAchievement[];
  states: Record<string, EmployeeSkillState>;
  lastUpdated?: string;
}