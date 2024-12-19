import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompetencyStore } from './state/types/competencyTypes';
import { initializeRoleState } from './state/utils/initializeState';
import { loadPersistedState } from './state/utils/persistenceUtils';

export const useCompetencyStore = create<CompetencyStore>()(
  persist(
    (set, get) => ({
      roleStates: {},
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setSkillState: (skillName, level, levelKey, required, roleId, employeeId) => {
        console.log('Setting skill state:', { skillName, level, levelKey, required, roleId, employeeId });
        set((state) => {
          const currentRoleState = state.roleStates[roleId]?.[employeeId] || {};
          const updatedRoleState = {
            ...currentRoleState,
            [skillName]: {
              ...(currentRoleState[skillName] || {}),
              [levelKey]: { level, required }
            }
          };

          return {
            roleStates: {
              ...state.roleStates,
              [roleId]: {
                ...state.roleStates[roleId],
                [employeeId]: updatedRoleState
              }
            },
            currentStates: {
              ...state.currentStates,
              [roleId]: {
                ...state.currentStates[roleId],
                [employeeId]: updatedRoleState
              }
            },
            hasChanges: true
          };
        });
      },

      setSkillProgression: (skillName, progression, roleId, employeeId) => {
        set((state) => {
          const currentRoleState = state.roleStates[roleId]?.[employeeId] || {};
          const updatedRoleState = {
            ...currentRoleState,
            [skillName]: {
              ...(currentRoleState[skillName] || {}),
              ...progression
            }
          };

          return {
            roleStates: {
              ...state.roleStates,
              [roleId]: {
                ...state.roleStates[roleId],
                [employeeId]: updatedRoleState
              }
            },
            currentStates: {
              ...state.currentStates,
              [roleId]: {
                ...state.currentStates[roleId],
                [employeeId]: updatedRoleState
              }
            },
            hasChanges: true
          };
        });
      },

      resetLevels: (roleId, employeeId) => {
        const freshState = initializeRoleState(roleId);
        set((state) => ({
          roleStates: {
            ...state.roleStates,
            [roleId]: {
              ...state.roleStates[roleId],
              [employeeId]: freshState
            }
          },
          currentStates: {
            ...state.currentStates,
            [roleId]: {
              ...state.currentStates[roleId],
              [employeeId]: freshState
            }
          },
          hasChanges: true
        }));
      },

      saveChanges: (roleId, employeeId) => {
        set((state) => ({
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
        const currentState = get().roleStates[roleId]?.[employeeId];
        if (!currentState) {
          const savedState = loadPersistedState(roleId, employeeId);
          
          if (savedState) {
            set((state) => ({
              roleStates: {
                ...state.roleStates,
                [roleId]: {
                  ...state.roleStates[roleId],
                  [employeeId]: savedState
                }
              },
              currentStates: {
                ...state.currentStates,
                [roleId]: {
                  ...state.currentStates[roleId],
                  [employeeId]: savedState
                }
              },
              originalStates: {
                ...state.originalStates,
                [roleId]: {
                  ...state.originalStates[roleId],
                  [employeeId]: savedState
                }
              }
            }));
          } else {
            const initialState = initializeRoleState(roleId);
            set((state) => ({
              roleStates: {
                ...state.roleStates,
                [roleId]: {
                  ...state.roleStates[roleId],
                  [employeeId]: initialState
                }
              },
              currentStates: {
                ...state.currentStates,
                [roleId]: {
                  ...state.currentStates[roleId],
                  [employeeId]: initialState
                }
              },
              originalStates: {
                ...state.originalStates,
                [roleId]: {
                  ...state.originalStates[roleId],
                  [employeeId]: initialState
                }
              }
            }));
          }
        }
      },

      getRoleState: (roleId, employeeId) => {
        return get().roleStates[roleId]?.[employeeId] || {};
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