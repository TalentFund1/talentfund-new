import { EmployeeSkillData, EmployeeSkillState } from '../../types/employeeSkillTypes';

export const createSkillSelectors = (get: any) => ({
  getSkillState: (employeeId: string, skillTitle: string): EmployeeSkillData => {
    console.log('Getting skill state:', { employeeId, skillTitle });
    const state = get().skillStates[employeeId]?.skills[skillTitle];
    
    if (!state) {
      const defaultState: EmployeeSkillData = {
        id: `${employeeId}-${skillTitle}`,
        employeeId,
        skillId: `${employeeId}-${skillTitle}`,
        title: skillTitle,
        level: 'unspecified',
        goalStatus: 'unknown',
        lastUpdated: new Date().toISOString(),
        confidence: 'medium',
        subcategory: 'General',
        category: 'specialized',
        businessCategory: 'Technical Skills',
        weight: 'technical',
        growth: '0%',
        salary: 'market',
        skillScore: 0,
        inDevelopmentPlan: false,
        benchmarks: {
          B: false,
          R: false,
          M: false,
          O: false
        }
      };
      return defaultState;
    }
    
    return state;
  },

  getEmployeeSkills: (employeeId: string): EmployeeSkillData[] => {
    console.log('Getting skills for employee:', employeeId);
    const employeeState = get().skillStates[employeeId];
    
    if (!employeeState?.skills) {
      return [];
    }

    return Object.values(employeeState.skills);
  }
});