import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompetencyState } from './types/competencyTypes';
import { setSkillStateAction, setSkillProgressionAction } from './actions/stateActions';
import { loadPersistedState, persistState } from './utils/persistenceUtils';
import { initializeRoleState } from './utils/initializeState';

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set, get) => ({
      roleStates: {},
      currentStates: {},
      originalStates: {},
      employeeStates: {},
      hasChanges: false,

      setSkillState: (skillName, level, levelKey, required, roleId, employeeId) => {
        set((state) => {
          const { roleStates, employeeStates } = setSkillStateAction(
            state.roleStates,
            state.employeeStates,
            skillName,
            level,
            levelKey,
            required,
            roleId,
            employeeId
          );

          const newState = {
            roleStates,
            employeeStates,
            currentStates: {
              ...state.currentStates,
              [roleId]: employeeId ? employeeStates[employeeId]?.[roleId] : roleStates[roleId]
            },
            hasChanges: true
          };

          if (employeeId) {
            persistState(roleId, employeeStates[employeeId]?.[roleId] || {}, employeeId);
          } else {
            persistState(roleId, roleStates[roleId]);
          }

          return newState;
        });
      },

      setSkillProgression: (skillName, progression, roleId, employeeId) => {
        set((state) => {
          const { roleStates, employeeStates } = setSkillProgressionAction(
            state.roleStates,
            state.employeeStates,
            skillName,
            progression,
            roleId,
            employeeId
          );

          const newState = {
            roleStates,
            employeeStates,
            currentStates: {
              ...state.currentStates,
              [roleId]: employeeId ? employeeStates[employeeId]?.[roleId] : roleStates[roleId]
            },
            hasChanges: true
          };

          if (employeeId) {
            persistState(roleId, employeeStates[employeeId]?.[roleId] || {}, employeeId);
          } else {
            persistState(roleId, roleStates[roleId]);
          }

          return newState;
        });
      },

      getEmployeeSkillState: (skillName, employeeId, roleId) => {
        const state = get();
        return state.employeeStates[employeeId]?.[roleId]?.[skillName] || null;
      },

      resetLevels: (roleId, employeeId) => {
        set((state) => {
          const freshState = initializeRoleState(roleId);
          
          if (employeeId) {
            const updatedEmployeeStates = {
              ...state.employeeStates,
              [employeeId]: {
                ...state.employeeStates[employeeId],
                [roleId]: freshState
              }
            };

            persistState(roleId, freshState, employeeId);

            return {
              ...state,
              employeeStates: updatedEmployeeStates,
              currentStates: {
                ...state.currentStates,
                [roleId]: freshState
              },
              hasChanges: true
            };
          }

          persistState(roleId, freshState);

          return {
            ...state,
            roleStates: {
              ...state.roleStates,
              [roleId]: freshState
            },
            currentStates: {
              ...state.currentStates,
              [roleId]: freshState
            },
            hasChanges: true
          };
        });
      },

      saveChanges: (roleId, employeeId) => {
        set((state) => {
          if (employeeId) {
            const currentEmployeeState = state.employeeStates[employeeId]?.[roleId];
            persistState(roleId, currentEmployeeState || {}, employeeId);
            
            return {
              ...state,
              originalStates: {
                ...state.originalStates,
                [`${employeeId}-${roleId}`]: { ...currentEmployeeState }
              },
              hasChanges: false
            };
          }

          const currentRoleState = state.roleStates[roleId];
          persistState(roleId, currentRoleState);
          
          return {
            ...state,
            originalStates: {
              ...state.originalStates,
              [roleId]: { ...currentRoleState }
            },
            hasChanges: false
          };
        });
      },

      cancelChanges: (roleId, employeeId) => {
        set((state) => {
          if (employeeId) {
            const originalEmployeeState = state.originalStates[`${employeeId}-${roleId}`];
            return {
              ...state,
              employeeStates: {
                ...state.employeeStates,
                [employeeId]: {
                  ...state.employeeStates[employeeId],
                  [roleId]: { ...originalEmployeeState }
                }
              },
              currentStates: {
                ...state.currentStates,
                [roleId]: { ...originalEmployeeState }
              },
              hasChanges: false
            };
          }

          const originalRoleState = state.originalStates[roleId];
          return {
            ...state,
            roleStates: {
              ...state.roleStates,
              [roleId]: { ...originalRoleState }
            },
            currentStates: {
              ...state.currentStates,
              [roleId]: { ...originalRoleState }
            },
            hasChanges: false
          };
        });
      },

      initializeState: (roleId, employeeId) => {
        const state = get();
        
        if (employeeId && !state.employeeStates[employeeId]?.[roleId]) {
          console.log('Initializing state for employee:', { employeeId, roleId });
          const savedState = loadPersistedState(roleId, employeeId);
          
          if (savedState) {
            console.log('Loaded saved state for employee:', { employeeId, roleId });
            set((state) => ({
              ...state,
              employeeStates: {
                ...state.employeeStates,
                [employeeId]: {
                  ...state.employeeStates[employeeId],
                  [roleId]: savedState
                }
              },
              currentStates: {
                ...state.currentStates,
                [roleId]: savedState
              }
            }));
          } else {
            console.log('Creating new state for employee:', { employeeId, roleId });
            const initialState = initializeRoleState(roleId);
            set((state) => ({
              ...state,
              employeeStates: {
                ...state.employeeStates,
                [employeeId]: {
                  ...state.employeeStates[employeeId],
                  [roleId]: initialState
                }
              },
              currentStates: {
                ...state.currentStates,
                [roleId]: initialState
              }
            }));
          }
          return;
        }

        if (!state.roleStates[roleId]) {
          console.log('Initializing state for role:', roleId);
          const savedState = loadPersistedState(roleId);
          
          if (savedState) {
            set((state) => ({
              ...state,
              roleStates: {
                ...state.roleStates,
                [roleId]: savedState
              },
              currentStates: {
                ...state.currentStates,
                [roleId]: savedState
              }
            }));
          } else {
            const initialState = initializeRoleState(roleId);
            set((state) => ({
              ...state,
              roleStates: {
                ...state.roleStates,
                [roleId]: initialState
              },
              currentStates: {
                ...state.currentStates,
                [roleId]: initialState
              }
            }));
          }
        }
      },

      getRoleState: (roleId, employeeId) => {
        const state = get();
        if (employeeId) {
          return state.employeeStates[employeeId]?.[roleId] || {};
        }
        return state.roleStates[roleId] || {};
      }
    }),
    {
      name: 'competency-storage',
      version: 24, // Increment version to ensure clean state with new employee scoping
      partialize: (state) => ({
        roleStates: state.roleStates,
        currentStates: state.currentStates,
        originalStates: state.originalStates,
        employeeStates: state.employeeStates
      })
    }
  )
);