import { EmployeeSkillData, EmployeeSkillUpdate } from '../../types/employeeSkillTypes';

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
  },

  updateSkillState: (employeeId: string, skillTitle: string, updates: EmployeeSkillUpdate) => {
    console.log('Updating skill state:', { employeeId, skillTitle, updates });
    
    set((state: any) => {
      const currentState = state.skillStates[employeeId] || { 
        skills: {},
        lastUpdated: new Date().toISOString()
      };

      const currentSkill = currentState.skills[skillTitle] || {
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

      const updatedSkill = {
        ...currentSkill,
        ...updates,
        lastUpdated: new Date().toISOString()
      };

      console.log('Updated skill state:', {
        employeeId,
        skillTitle,
        before: currentSkill,
        after: updatedSkill
      });

      return {
        ...state,
        skillStates: {
          ...state.skillStates,
          [employeeId]: {
            ...currentState,
            skills: {
              ...currentState.skills,
              [skillTitle]: updatedSkill
            },
            lastUpdated: new Date().toISOString()
          }
        }
      };
    });
  }
});