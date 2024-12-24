import { EmployeeSkillAchievement, EmployeeSkillState } from '../../types/employeeSkillTypes';

export const createSkillStateSelectors = (get: () => any) => ({
  getEmployeeSkills: (employeeId: string): EmployeeSkillAchievement[] => {
    console.log('Getting employee skills:', { employeeId });
    const state = get();
    if (!state.employeeSkills[employeeId]) {
      state.initializeEmployeeSkills(employeeId);
    }
    return state.employeeSkills[employeeId]?.skills || [];
  },

  getSkillState: (employeeId: string, skillTitle: string): EmployeeSkillState => {
    console.log('Getting skill state:', { employeeId, skillTitle });
    const state = get();
    const skillState = state.employeeSkills[employeeId]?.states[skillTitle];
    const defaultState: EmployeeSkillState = {
      level: 'unspecified',
      goalStatus: 'unknown',
      lastUpdated: new Date().toISOString()
    };

    if (!skillState) {
      console.log('No existing skill state found:', {
        employeeId,
        skillTitle,
        usingDefault: true
      });
      return defaultState;
    }

    console.log('Retrieved employee skill state:', {
      employeeId,
      skillTitle,
      state: skillState
    });
    
    return skillState;
  }
});