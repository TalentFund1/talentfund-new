import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmployeeSkillState, SkillLevel, EmployeeSkillGoalStatus } from '../../skills/types/skillStateTypes';

interface EmployeeSkillsStore {
  skillStates: Record<string, Record<string, EmployeeSkillState>>;
  getSkillState: (employeeId: string, skillTitle: string) => EmployeeSkillState;
  setSkillLevel: (employeeId: string, skillTitle: string, level: SkillLevel) => void;
  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: EmployeeSkillGoalStatus) => void;
  initializeEmployeeSkills: (employeeId: string) => void;
}

const defaultSkillState: EmployeeSkillState = {
  level: 'unspecified',
  goalStatus: 'unknown',
  lastUpdated: new Date().toISOString(),
  confidence: 'medium'
};

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      skillStates: {},

      getSkillState: (employeeId, skillTitle) => {
        console.log('Getting employee skill state:', { employeeId, skillTitle });
        const state = get().skillStates[employeeId]?.[skillTitle];
        if (!state) {
          return { ...defaultSkillState };
        }
        return state;
      },

      setSkillLevel: (employeeId, skillTitle, level) => {
        console.log('Setting employee skill level:', { employeeId, skillTitle, level });
        set(state => ({
          skillStates: {
            ...state.skillStates,
            [employeeId]: {
              ...state.skillStates[employeeId],
              [skillTitle]: {
                ...state.skillStates[employeeId]?.[skillTitle] || defaultSkillState,
                level,
                lastUpdated: new Date().toISOString()
              }
            }
          }
        }));
      },

      setSkillGoalStatus: (employeeId, skillTitle, goalStatus) => {
        console.log('Setting employee skill goal status:', { employeeId, skillTitle, goalStatus });
        set(state => ({
          skillStates: {
            ...state.skillStates,
            [employeeId]: {
              ...state.skillStates[employeeId],
              [skillTitle]: {
                ...state.skillStates[employeeId]?.[skillTitle] || defaultSkillState,
                goalStatus,
                lastUpdated: new Date().toISOString()
              }
            }
          }
        }));
      },

      initializeEmployeeSkills: (employeeId) => {
        console.log('Initializing employee skills:', employeeId);
        const currentState = get().skillStates[employeeId];
        if (!currentState) {
          set(state => ({
            skillStates: {
              ...state.skillStates,
              [employeeId]: {}
            }
          }));
        }
      }
    }),
    {
      name: 'employee-skills-storage',
      version: 1,
      partialize: (state) => ({
        skillStates: state.skillStates
      })
    }
  )
);