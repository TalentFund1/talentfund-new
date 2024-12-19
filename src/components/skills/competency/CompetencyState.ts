import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompetencyState, SkillState } from './state/types';
import { getSkillStateValue, getRequirementValue, normalizeSkillState } from './utils/skillStateUtils';

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set) => ({
      roleStates: {},
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setSkillState: (skillName, level, levelKey, required, roleId, employeeId) => {
        console.log('Setting skill state:', { skillName, level, levelKey, required, roleId, employeeId });
        
        set((state) => {
          const newState = {
            ...state,
            roleStates: {
              ...state.roleStates,
              [roleId]: {
                ...state.roleStates[roleId],
                [employeeId]: {
                  ...state.roleStates[roleId]?.[employeeId],
                  [skillName]: {
                    ...state.roleStates[roleId]?.[employeeId]?.[skillName],
                    [levelKey]: { level, required }
                  }
                }
              }
            },
            currentStates: {
              ...state.currentStates,
              [roleId]: {
                ...state.currentStates[roleId],
                [employeeId]: {
                  ...state.currentStates[roleId]?.[employeeId],
                  [skillName]: {
                    ...state.currentStates[roleId]?.[employeeId]?.[skillName],
                    [levelKey]: { level, required }
                  }
                }
              }
            },
            hasChanges: true
          };
          return newState;
        });
      },

      setSkillProgression: (skillName, progression, roleId, employeeId) => {
        console.log('Setting skill progression:', { skillName, progression, roleId, employeeId });
        
        set((state) => ({
          ...state,
          roleStates: {
            ...state.roleStates,
            [roleId]: {
              ...state.roleStates[roleId],
              [employeeId]: {
                ...state.roleStates[roleId]?.[employeeId],
                [skillName]: progression
              }
            }
          },
          currentStates: {
            ...state.currentStates,
            [roleId]: {
              ...state.currentStates[roleId],
              [employeeId]: {
                ...state.currentStates[roleId]?.[employeeId],
                [skillName]: progression
              }
            }
          },
          hasChanges: true
        }));
      },

      resetLevels: (roleId, employeeId) => {
        set((state) => ({
          ...state,
          roleStates: {
            ...state.roleStates,
            [roleId]: {
              ...state.roleStates[roleId],
              [employeeId]: {}
            }
          },
          currentStates: {
            ...state.currentStates,
            [roleId]: {
              ...state.currentStates[roleId],
              [employeeId]: {}
            }
          },
          hasChanges: true
        }));
      },

      saveChanges: (roleId, employeeId) => {
        set((state) => ({
          ...state,
          originalStates: {
            ...state.originalStates,
            [roleId]: {
              ...state.originalStates[roleId],
              [employeeId]: state.roleStates[roleId]?.[employeeId] || {}
            }
          },
          hasChanges: false
        }));
      },

      cancelChanges: (roleId, employeeId) => {
        set((state) => ({
          ...state,
          roleStates: {
            ...state.roleStates,
            [roleId]: {
              ...state.roleStates[roleId],
              [employeeId]: state.originalStates[roleId]?.[employeeId] || {}
            }
          },
          currentStates: {
            ...state.currentStates,
            [roleId]: {
              ...state.currentStates[roleId],
              [employeeId]: state.originalStates[roleId]?.[employeeId] || {}
            }
          },
          hasChanges: false
        }));
      },

      initializeState: (roleId, employeeId) => {
        set((state) => {
          if (!state.roleStates[roleId]?.[employeeId]) {
            return {
              ...state,
              roleStates: {
                ...state.roleStates,
                [roleId]: {
                  ...state.roleStates[roleId],
                  [employeeId]: {}
                }
              },
              currentStates: {
                ...state.currentStates,
                [roleId]: {
                  ...state.currentStates[roleId],
                  [employeeId]: {}
                }
              },
              originalStates: {
                ...state.originalStates,
                [roleId]: {
                  ...state.originalStates[roleId],
                  [employeeId]: {}
                }
              }
            };
          }
          return state;
        });
      },

      getRoleState: (roleId, employeeId) => {
        return {};
      }
    }),
    {
      name: 'competency-storage',
      version: 24,
      partialize: (state) => ({
        roleStates: state.roleStates,
        currentStates: state.currentStates,
        originalStates: state.originalStates
      })
    }
  )
);