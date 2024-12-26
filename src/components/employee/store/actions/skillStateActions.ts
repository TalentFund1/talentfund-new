import { EmployeeSkillData } from '../../types/employeeSkillTypes';

export const createSkillStateActions = (set: any, get: any) => ({
  setSkillLevel: (employeeId: string, skillTitle: string, level: string) => {
    console.log('Setting skill level:', { employeeId, skillTitle, level });
    const store = get();
    store.updateSkillState(employeeId, skillTitle, { level });
  },

  setSkillGoalStatus: (employeeId: string, skillTitle: string, goalStatus: string) => {
    console.log('Setting skill goal status:', { employeeId, skillTitle, goalStatus });
    // Normalize legacy values to 'skill_goal'
    let normalizedStatus = goalStatus;
    if (goalStatus === 'required' || goalStatus === 'preferred') {
      normalizedStatus = 'skill_goal';
    }
    
    const store = get();
    store.updateSkillState(employeeId, skillTitle, { goalStatus: normalizedStatus });
  }
});