import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompetencyStore } from './state/types/competencyTypes';
import { setSkillStateAction, setSkillProgressionAction } from './state/actions/competencyActions';
import { loadPersistedState } from './state/utils/persistenceUtils';
import { initializeRoleState } from './state/utils/initializeState';

export const useCompetencyStore = create<CompetencyStore>()(
  persist(
    (set, get) => ({
      roleStates: {},
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setSkillState: (skillName, level, levelKey, required, roleId, employeeId) => {
        set((state) => setSkillStateAction(state, skillName, level, levelKey, required, roleId, employeeId));
      },

      setSkillProgression: (skillName, progression, roleId, employeeId) => {
        set((state) => setSkillProgressionAction(state, skillName, progression, roleId, employeeId));
      },

      resetLevels: (roleId, employeeId) => {
        console.log('Resetting levels for role and employee:', { roleId, employeeId });
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
        console.log('Saving changes for role and employee:', { roleId, employeeId });
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
        console.log('Canceling changes for role and employee:', { roleId, employeeId });
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
          console.log('Initializing state for role and employee:', { roleId, employeeId });
          const savedState = loadPersistedState(roleId, employeeId);
          
          if (savedState) {
            console.log('Loaded saved state for role and employee:', { roleId, employeeId });
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
            console.log('Creating new state for role and employee:', { roleId, employeeId });
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