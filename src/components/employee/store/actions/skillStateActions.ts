import { 
  EmployeeSkillState, 
  EmployeeSkillUpdate,
  SkillLevel,
  SkillGoalStatus,
  SkillConfidence
} from '../../types/employeeSkillTypes';

export const createSkillStateActions = (set: any, get: any) => ({
  setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => {
    console.log('Setting skill level:', { employeeId, skillTitle, level });
    const store = get();
    store.updateSkillState(employeeId, skillTitle, { level });
  },

  setSkillGoalStatus: (employeeId: string, skillTitle: string, goalStatus: SkillGoalStatus) => {
    console.log('Setting skill goal status:', { employeeId, skillTitle, goalStatus });
    const store = get();
    store.updateSkillState(employeeId, skillTitle, { goalStatus });
  },

  setSkillConfidence: (employeeId: string, skillTitle: string, confidence: SkillConfidence) => {
    console.log('Setting skill confidence:', { employeeId, skillTitle, confidence });
    const store = get();
    store.updateSkillState(employeeId, skillTitle, { confidence });
  },

  updateSkillState: (employeeId: string, skillTitle: string, updates: EmployeeSkillUpdate) => {
    console.log('Updating skill state:', { employeeId, skillTitle, updates });
    set((state: any) => {
      const currentSkill = state.skills[employeeId]?.skills[skillTitle];
      if (!currentSkill) {
        console.warn('No skill found to update:', { employeeId, skillTitle });
        return state;
      }

      return {
        skills: {
          ...state.skills,
          [employeeId]: {
            ...state.skills[employeeId],
            skills: {
              ...state.skills[employeeId].skills,
              [skillTitle]: {
                ...currentSkill,
                ...updates,
                lastUpdated: new Date().toISOString()
              }
            },
            lastUpdated: new Date().toISOString()
          }
        }
      };
    });
  }
});