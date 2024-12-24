import { SkillLevel, SkillGoalStatus, EmployeeSkill } from '../../types/employeeSkillTypes';
import { getUnifiedSkillData } from '../../../skills/data/skillDatabaseService';
import { SkillStateStore } from '../types/skillStateTypes';

export const createSkillStateActions = (
  set: (fn: (state: SkillStateStore) => Partial<SkillStateStore>) => void,
  get: () => SkillStateStore
) => ({
  setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => {
    console.log('Setting skill level:', { employeeId, skillTitle, level });
    set((state) => {
      const employeeData = state.employeeSkills[employeeId] || {
        employeeId,
        skills: [],
        states: {}
      };

      const updatedSkills = [...employeeData.skills];
      const skillIndex = updatedSkills.findIndex(s => s.title === skillTitle);

      if (skillIndex >= 0) {
        updatedSkills[skillIndex] = {
          ...updatedSkills[skillIndex],
          level,
          lastUpdated: new Date().toISOString()
        };
      } else {
        const skillData = getUnifiedSkillData(skillTitle);
        updatedSkills.push({
          ...skillData,
          id: `${employeeId}-${skillTitle}`,
          employeeId,
          level,
          goalStatus: 'unknown',
          lastUpdated: new Date().toISOString()
        });
      }

      return {
        employeeSkills: {
          ...state.employeeSkills,
          [employeeId]: {
            ...employeeData,
            skills: updatedSkills,
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
    set((state) => {
      const employeeData = state.employeeSkills[employeeId] || {
        employeeId,
        skills: [],
        states: {}
      };

      const updatedSkills = [...employeeData.skills];
      const skillIndex = updatedSkills.findIndex(s => s.title === skillTitle);

      if (skillIndex >= 0) {
        updatedSkills[skillIndex] = {
          ...updatedSkills[skillIndex],
          goalStatus: status,
          lastUpdated: new Date().toISOString()
        };
      }

      return {
        employeeSkills: {
          ...state.employeeSkills,
          [employeeId]: {
            ...employeeData,
            skills: updatedSkills,
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