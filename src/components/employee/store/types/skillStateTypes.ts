import { EmployeeSkillData, EmployeeSkillState } from '../../types/employeeSkillTypes';

export interface SkillStates {
  [employeeId: string]: {
    skills: {
      [skillTitle: string]: EmployeeSkillData;
    };
    lastUpdated: string;
  };
}

export interface SkillStateUpdate {
  level?: string;
  goalStatus?: string;
  confidence?: 'low' | 'medium' | 'high';
}