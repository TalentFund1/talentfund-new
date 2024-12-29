import { SkillLevel, SkillGoalStatus } from './employeeSkillTypes';

export interface EmployeeSkillState {
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
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
}

console.log('Employee skill state types loaded');