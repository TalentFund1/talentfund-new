import { EmployeeSkillData } from '../../types/employeeSkillTypes';

export const createSkillStateActions = (set: any, get: any) => ({
  setSkillLevel: (employeeId: string, skillTitle: string, level: string) => {
    console.log('Setting skill level:', { employeeId, skillTitle, level });
    const store = get();
    store.updateSkillState(employeeId, skillTitle, { level });
  },

  setSkillGoalStatus: (employeeId: string, skillTitle: string, goalStatus: string) => {
    console.log('Setting skill goal status:', { employeeId, skillTitle, goalStatus });
    // Map legacy statuses to new system
    let normalizedStatus = goalStatus;
    if (goalStatus === 'skill_goal') {
      normalizedStatus = 'required';
    } else if (goalStatus === 'not_interested') {
      normalizedStatus = 'preferred';
    }
    
    const store = get();
    store.updateSkillState(employeeId, skillTitle, { goalStatus: normalizedStatus });
  }
});