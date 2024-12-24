import { SkillLevel, SkillGoalStatus, EmployeeSkill, EmployeeSkillState } from '../../types/employeeSkillTypes';

export interface SkillStateActions {
  setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => void;
  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: SkillGoalStatus) => void;
  initializeEmployeeSkills: (employeeId: string) => void;
  getSkillState: (employeeId: string, skillTitle: string) => EmployeeSkillState;
}

export interface SkillStateData {
  employeeId: string;
  skills: EmployeeSkill[];
  states: Record<string, EmployeeSkillState>;
}

export interface SkillStateStore extends SkillStateActions {
  employeeSkills: Record<string, SkillStateData>;
}