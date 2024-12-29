import { SkillLevel, SkillGoalStatus } from '../../types/employeeSkillTypes';
import { produce } from 'immer';

export const createSkillStateUpdater = (set: any, get: any) => ({
  setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => {
    console.log('Setting skill level:', { employeeId, skillTitle, level });
    
    set(produce((state: any) => {
      if (!state.skillStates[employeeId]) {
        state.skillStates[employeeId] = {
          skills: {},
          lastUpdated: new Date().toISOString()
        };
      }

      if (!state.skillStates[employeeId].skills[skillTitle]) {
        state.skillStates[employeeId].skills[skillTitle] = {
          id: `${employeeId}-${skillTitle}`,
          employeeId,
          skillId: `${employeeId}-${skillTitle}`,
          title: skillTitle,
          level: 'unspecified',
          goalStatus: 'unknown',
          lastUpdated: new Date().toISOString(),
          confidence: 'medium',
          skillScore: 0,
          inDevelopmentPlan: false,
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

      state.skillStates[employeeId].skills[skillTitle].level = level;
      state.skillStates[employeeId].skills[skillTitle].lastUpdated = new Date().toISOString();
      state.skillStates[employeeId].lastUpdated = new Date().toISOString();
    }), true);

    // Force immediate persistence
    const currentState = get().skillStates;
    localStorage.setItem('employee-skills-storage', JSON.stringify(currentState));
  },

  setSkillGoalStatus: (employeeId: string, skillTitle: string, goalStatus: SkillGoalStatus) => {
    console.log('Setting skill goal status:', { employeeId, skillTitle, goalStatus });
    
    set(produce((state: any) => {
      if (!state.skillStates[employeeId]) {
        state.skillStates[employeeId] = {
          skills: {},
          lastUpdated: new Date().toISOString()
        };
      }

      if (!state.skillStates[employeeId].skills[skillTitle]) {
        state.skillStates[employeeId].skills[skillTitle] = {
          id: `${employeeId}-${skillTitle}`,
          employeeId,
          skillId: `${employeeId}-${skillTitle}`,
          title: skillTitle,
          level: 'unspecified',
          goalStatus: 'unknown',
          lastUpdated: new Date().toISOString(),
          confidence: 'medium',
          skillScore: 0,
          inDevelopmentPlan: false,
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

      state.skillStates[employeeId].skills[skillTitle].goalStatus = goalStatus;
      state.skillStates[employeeId].skills[skillTitle].lastUpdated = new Date().toISOString();
      state.skillStates[employeeId].lastUpdated = new Date().toISOString();
    }), true);

    // Force immediate persistence
    const currentState = get().skillStates;
    localStorage.setItem('employee-skills-storage', JSON.stringify(currentState));
  }
});