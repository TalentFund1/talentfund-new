import { EmployeeSkillAchievement, EmployeeSkillState } from '../../types/employeeSkillTypes';

export const createSkillSelectors = (get: any) => ({
  getSkillState: (employeeId: string, skillTitle: string): EmployeeSkillState => {
    console.log('Getting skill state:', { employeeId, skillTitle });
    const state = get().skillStates[employeeId]?.skills[skillTitle];
    
    if (!state) {
      return {
        level: 'unspecified',
        goalStatus: 'unknown',
        lastUpdated: new Date().toISOString(),
        confidence: 'medium'
      };
    }
    
    return state;
  },

  getEmployeeSkills: (employeeId: string): EmployeeSkillAchievement[] => {
    console.log('Getting skills for employee:', employeeId);
    const employeeState = get().skillStates[employeeId];
    
    if (!employeeState) {
      return [];
    }

    return Object.entries(employeeState.skills).map(([title, state]) => ({
      id: `${employeeId}-${title}`,
      employeeId,
      skillId: `${employeeId}-${title}`,
      title,
      ...state
    }));
  }
});