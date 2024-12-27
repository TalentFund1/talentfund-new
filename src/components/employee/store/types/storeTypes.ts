import { EmployeeSkillData, EmployeeSkillsState, EmployeeSkillUpdate } from '../../types/employeeSkillTypes';

export interface EmployeeSkillsStoreState {
  skillStates: Record<string, EmployeeSkillsState>;
}

export interface EmployeeSkillsStoreMethods {
  getSkillState: (employeeId: string, skillTitle: string) => EmployeeSkillData;
  getEmployeeSkills: (employeeId: string) => EmployeeSkillData[];
  setSkillLevel: (employeeId: string, skillTitle: string, level: string) => void;
  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: string) => void;
  initializeEmployeeSkills: (employeeId: string) => void;
  updateSkillState: (employeeId: string, skillTitle: string, updates: EmployeeSkillUpdate) => void;
  batchUpdateSkills: (employeeId: string, updates: Record<string, EmployeeSkillUpdate>) => void;
  addSkill: (employeeId: string, skillTitle: string) => void;
}

export type EmployeeSkillsStore = EmployeeSkillsStoreState & EmployeeSkillsStoreMethods;