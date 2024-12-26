import { normalizeGoalStatus } from '../../utils/skillStatusNormalizer';
import { EmployeeSkillData } from '../../types/employeeSkillTypes';

export const createSkillStateActions = (set: any, get: any) => ({
  setSkillLevel: (employeeId: string, skillTitle: string, level: string) => {
    console.log('Setting skill level:', { employeeId, skillTitle, level });
    const store = get();
    store.updateSkillState(employeeId, skillTitle, { level });
  },

  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: string) => {
    console.log('Setting skill goal status:', { employeeId, skillTitle, status });
    const normalizedStatus = normalizeGoalStatus(status as any);
    console.log('Normalized status:', { original: status, normalized: normalizedStatus });
    
    const store = get();
    store.updateSkillState(employeeId, skillTitle, { goalStatus: normalizedStatus });
  }
});