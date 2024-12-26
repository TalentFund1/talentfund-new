import { EmployeeSkillAchievement, EmployeeSkillState, SkillLevel, SkillGoalStatus } from '../../types/employeeSkillTypes';

export interface IEmployeeSkillsStore {
  // Core data access
  getEmployeeSkills: (employeeId: string) => EmployeeSkillAchievement[];
  getSkillState: (employeeId: string, skillTitle: string) => EmployeeSkillState;
  
  // State updates
  setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => void;
  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: SkillGoalStatus) => void;
  batchUpdateSkills: (employeeId: string, updates: Record<string, EmployeeSkillState>) => void;
  
  // Initialization
  initializeEmployeeSkills: (employeeId: string) => void;
}

// Type guard to verify store implementation
export const isEmployeeSkillsStore = (store: any): store is IEmployeeSkillsStore => {
  return (
    typeof store.getEmployeeSkills === 'function' &&
    typeof store.getSkillState === 'function' &&
    typeof store.initializeEmployeeSkills === 'function' &&
    typeof store.setSkillLevel === 'function' &&
    typeof store.setSkillGoalStatus === 'function' &&
    typeof store.batchUpdateSkills === 'function'
  );
};

// Custom hook type for accessing store
export type UseEmployeeSkillsStore = () => IEmployeeSkillsStore;