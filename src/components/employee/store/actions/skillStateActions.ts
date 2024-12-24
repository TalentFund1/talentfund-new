import { EmployeeSkillState, SkillLevel, SkillGoalStatus } from '../../types/employeeSkillTypes';

export const createSkillStateActions = (set: any, get: any) => ({
  setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => {
    console.log('Setting skill level:', { employeeId, skillTitle, level });
    set(state => {
      const currentState = state.skillStates[employeeId] || { skills: {}, lastUpdated: new Date().toISOString() };
      return {
        skillStates: {
          ...state.skillStates,
          [employeeId]: {
            ...currentState,
            skills: {
              ...currentState.skills,
              [skillTitle]: {
                ...currentState.skills[skillTitle],
                level,
                lastUpdated: new Date().toISOString()
              }
            }
          }
        }
      };
    });
  },

  setSkillGoalStatus: (employeeId: string, skillTitle: string, goalStatus: SkillGoalStatus) => {
    console.log('Setting skill goal status:', { employeeId, skillTitle, goalStatus });
    set(state => {
      const currentState = state.skillStates[employeeId] || { skills: {}, lastUpdated: new Date().toISOString() };
      return {
        skillStates: {
          ...state.skillStates,
          [employeeId]: {
            ...currentState,
            skills: {
              ...currentState.skills,
              [skillTitle]: {
                ...currentState.skills[skillTitle],
                goalStatus,
                lastUpdated: new Date().toISOString()
              }
            }
          }
        }
      };
    });
  }
});