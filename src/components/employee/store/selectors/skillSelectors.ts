import { EmployeeSkillAchievement, EmployeeSkillState } from '../types/skillStoreTypes';

export const createSkillSelectors = (get: any) => ({
  getEmployeeSkills: (employeeId: string): EmployeeSkillAchievement[] => {
    console.log('Getting skills for employee:', employeeId);
    return get().employeeSkills[employeeId]?.skills || [];
  },

  getSkillState: (employeeId: string, skillTitle: string): EmployeeSkillState => {
    const state = get().employeeSkills[employeeId]?.states[skillTitle];
    
    if (!state) {
      console.log('No existing skill state found:', {
        employeeId,
        skillTitle,
        usingDefault: true
      });
      
      return {
        level: 'unspecified',
        requirement: 'unknown',
        lastUpdated: new Date().toISOString()
      };
    }

    return state;
  }
});