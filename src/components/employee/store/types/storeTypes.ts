import { EmployeeSkillData, EmployeeSkillUpdate, EmployeeSkillState } from '../../types/employeeSkillTypes';

export interface EmployeeSkillsStoreState {
  skillStates: Record<string, {
    skills: Record<string, EmployeeSkillData>;
    lastUpdated: string;
  }>;
}

export interface EmployeeSkillsStoreMethods {
  getSkillState: (employeeId: string, skillTitle: string) => EmployeeSkillData;
  getEmployeeSkills: (employeeId: string) => EmployeeSkillData[];
  setSkillLevel: (employeeId: string, skillTitle: string, level: string) => void;
  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: string) => void;
  setSkillDevelopmentPlan: (employeeId: string, skillTitle: string, inDevelopmentPlan: boolean) => void;
  initializeEmployeeSkills: (employeeId: string) => void;
  updateSkillState: (employeeId: string, skillTitle: string, updates: EmployeeSkillUpdate) => void;
  batchUpdateSkills: (employeeId: string, updates: Record<string, EmployeeSkillUpdate>) => void;
}

export type EmployeeSkillsStore = EmployeeSkillsStoreState & EmployeeSkillsStoreMethods;