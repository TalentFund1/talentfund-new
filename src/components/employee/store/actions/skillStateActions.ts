import { SkillLevel, SkillGoalStatus } from '../../types/employeeSkillTypes';
import { EmployeeSkillState } from '../types/skillStoreTypes';

export const createSkillStateActions = (set: any, get: any) => ({
  setSkillLevel: (employeeId: string, skillTitle: string, level: string) => {
    console.log('Setting skill level:', { employeeId, skillTitle, level });
    const store = get();
    store.updateSkillState(employeeId, skillTitle, { level });
  },

  setSkillGoalStatus: (employeeId: string, skillTitle: string, goalStatus: string) => {
    console.log('Setting skill goal status:', { employeeId, skillTitle, goalStatus });
    const store = get();
    store.updateSkillState(employeeId, skillTitle, { goalStatus });
  }
});