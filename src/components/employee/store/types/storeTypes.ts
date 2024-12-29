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
  initializeEmployeeSkills: (employeeId: string) => void;
  updateSkillState: (employeeId: string, skillTitle: string, updates: EmployeeSkillUpdate) => void;
  batchUpdateSkills: (employeeId: string, updates: Record<string, EmployeeSkillUpdate>) => void;
  removeEmployeeSkill: (employeeId: string, skillTitle: string) => Promise<void>;
}

export type EmployeeSkillsStore = EmployeeSkillsStoreState & EmployeeSkillsStoreMethods;