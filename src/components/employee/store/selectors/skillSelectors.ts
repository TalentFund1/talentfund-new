import { EmployeeSkillData, EmployeeSkillState } from '../../types/employeeSkillTypes';

export const createSkillSelectors = (get: any) => ({
  getSkillState: (employeeId: string, skillTitle: string): EmployeeSkillData => {
    console.log('Getting skill state:', { employeeId, skillTitle });
    const state = get().skills[employeeId]?.skills[skillTitle];
    
    if (!state) {
      console.log('No existing skill state found, returning default:', { employeeId, skillTitle });
      return {
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
        benchmarks: {
          B: false,
          R: false,
          M: false,
          O: false
        }
      };
    }
    
    return state;
  },

  getEmployeeSkills: (employeeId: string): EmployeeSkillData[] => {
    console.log('Getting skills for employee:', employeeId);
    const employeeState = get().skills[employeeId];
    
    if (!employeeState?.skills) {
      console.log('No skills found for employee:', employeeId);
      return [];
    }

    return Object.values(employeeState.skills);
  }
});