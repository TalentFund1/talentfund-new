import { EmployeeSkillData, EmployeeSkillState, SkillLevel, SkillGoalStatus, EmployeeSkillUpdate } from '../../types/employeeSkillTypes';

export interface EmployeeSkillsStore {
  skillStates: Record<string, {
    skills: Record<string, EmployeeSkillData>;
    lastUpdated: string;
  }>;
  getEmployeeSkills: (employeeId: string) => EmployeeSkillData[];
  getSkillState: (employeeId: string, skillTitle: string) => EmployeeSkillState;
  initializeEmployeeSkills: (employeeId: string) => void;
  setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => void;
  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: SkillGoalStatus) => void;
  updateSkillState: (employeeId: string, skillTitle: string, updates: Partial<EmployeeSkillState>) => void;
  batchUpdateSkills: (employeeId: string, updates: Record<string, EmployeeSkillUpdate>) => void;
  removeEmployeeSkill: (employeeId: string, skillTitle: string) => Promise<void>;
}