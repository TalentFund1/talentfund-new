import { SkillLevel, SkillGoalStatus } from './employeeSkillTypes';

export interface EmployeeSkillState {
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
  confidence?: 'low' | 'medium' | 'high';
}

export interface EmployeeSkillData {
  employeeId: string;
  skillId: string;
  title: string;
  state: EmployeeSkillState;
}

export interface EmployeeSkillsState {
  skills: Record<string, EmployeeSkillData>;
  lastUpdated: string;
}

export interface EmployeeSkillUpdate {
  level?: SkillLevel;
  goalStatus?: SkillGoalStatus;
  confidence?: 'low' | 'medium' | 'high';
}

console.log('Employee skill state types loaded');