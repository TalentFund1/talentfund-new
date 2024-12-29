import { SkillLevel, SkillGoalStatus } from '../../types/employeeSkillTypes';
import { EmployeeSkillState } from '../../types/employeeSkillTypes';

export const createSkillActions = (set: any, get: any) => ({
  setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => {
    console.log('Setting skill level:', { employeeId, skillTitle, level });
    set(state => {
      const employeeData = state.employeeSkills[employeeId] || {
        employeeId,
        skills: [],
        states: {}
      };

      return {
        employeeSkills: {
          ...state.employeeSkills,
          [employeeId]: {
            ...employeeData,
            states: {
              ...employeeData.states,
              [skillTitle]: {
                ...employeeData.states[skillTitle],
                level,
                lastUpdated: new Date().toISOString()
              }
            }
          }
        }
      };
    });
  },

  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: SkillGoalStatus) => {
    console.log('Setting skill goal status:', { employeeId, skillTitle, status });
    set(state => {
      const employeeData = state.employeeSkills[employeeId] || {
        employeeId,
        skills: [],
        states: {}
      };

      return {
        employeeSkills: {
          ...state.employeeSkills,
          [employeeId]: {
            ...employeeData,
            states: {
              ...employeeData.states,
              [skillTitle]: {
                ...employeeData.states[skillTitle],
                requirement: status,
                lastUpdated: new Date().toISOString()
              }
            }
          }
        }
      };
    });
  }
});