import { SkillLevel, SkillGoalStatus } from './employeeSkillTypes';

export interface EmployeeSkillState {
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
  confidence?: 'low' | 'medium' | 'high';
}

export interface EmployeeSkillData {
  id: string;
  employeeId: string;
  skillId: string;
  title: string;
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
  confidence: 'low' | 'medium' | 'high';
  subcategory: string;
  category: string;
  businessCategory: string;
  weight: string;
  growth: string;
  salary: string;
  benchmarks: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
}

export interface EmployeeSkillsState {
  skills: Record<string, EmployeeSkillData>;
  lastUpdated: string;
}

console.log('Employee skill state types loaded');