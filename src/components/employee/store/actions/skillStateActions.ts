import { SkillLevel, SkillGoalStatus, EmployeeSkillState } from '../../types/employeeSkillTypes';
import { normalizeSkillLevel } from '../../types/skillLevels';
import { normalizeSkillStatus } from '../../types/skillStatus';

export const createSkillStateActions = (set: any, get: any) => ({
  setSkillLevel: (employeeId: string, skillTitle: string, level: string) => {
    console.log('Setting skill level:', { employeeId, skillTitle, level });
    const normalizedLevel = normalizeSkillLevel(level);
    const store = get();
    store.updateSkillState(employeeId, skillTitle, { level: normalizedLevel });
  },

  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: string) => {
    console.log('Setting skill goal status:', { employeeId, skillTitle, status });
    const normalizedStatus = normalizeSkillStatus(status);
    const store = get();
    store.updateSkillState(employeeId, skillTitle, { goalStatus: normalizedStatus });
  },

  updateSkillState: (employeeId: string, skillTitle: string, updates: Partial<EmployeeSkillState>) => {
    console.log('Updating skill state:', { employeeId, skillTitle, updates });
    set((state: any) => {
      const currentState = state.skillStates[employeeId]?.skills[skillTitle] || {
        level: 'unspecified' as SkillLevel,
        goalStatus: 'unknown' as SkillGoalStatus,
        lastUpdated: new Date().toISOString(),
        confidence: 'medium'
      };

      const normalizedUpdates = {
        ...updates,
        level: updates.level ? normalizeSkillLevel(updates.level) : currentState.level,
        goalStatus: updates.goalStatus ? normalizeSkillStatus(updates.goalStatus) : currentState.goalStatus,
        lastUpdated: new Date().toISOString()
      };

      return {
        skillStates: {
          ...state.skillStates,
          [employeeId]: {
            ...state.skillStates[employeeId],
            skills: {
              ...state.skillStates[employeeId]?.skills,
              [skillTitle]: {
                ...currentState,
                ...normalizedUpdates
              }
            }
          }
        }
      };
    });
  }
});

console.log('Skill state actions updated with new status system');