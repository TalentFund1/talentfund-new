import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompetencyState } from './types';
import { setSkillStateAction, setSkillProgressionAction } from './stateActions';
import { loadPersistedState } from './persistenceUtils';
import { initializeRoleState } from './initializeState';

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set, get) => ({
      roleStates: {},
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setSkillState: (skillName, level, levelKey, required, roleId) => {
        console.log('Setting skill state:', { skillName, level, levelKey, required, roleId });
        set((state) => {
          const newState = setSkillStateAction(state, skillName, level, levelKey, required, roleId);
          return newState;
        });
      },

      setSkillProgression: (skillName, progression, roleId) => {
        console.log('Setting skill progression:', { skillName, progression, roleId });
        set((state) => {
          const newState = setSkillProgressionAction(state, skillName, progression, roleId);
          return newState;
        });
      },

      resetLevels: (roleId) => {
        console.log('Resetting levels for role:', roleId);
        set((state) => {
          const freshState = initializeRoleState(roleId);
          return {
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

      saveChanges: (roleId) => {
        console.log('Saving changes for role:', roleId);
        set((state) => {
          const currentRoleState = state.roleStates[roleId];
          return {
            roleStates: state.roleStates,
            currentStates: state.currentStates,
            originalStates: {
              ...state.originalStates,
              [roleId]: { ...currentRoleState }
            },
            hasChanges: false
          };
        });
      },

      cancelChanges: (roleId) => {
        console.log('Canceling changes for role:', roleId);
        set((state) => {
          const originalRoleState = state.originalStates[roleId];
          return {
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

      initializeState: (roleId) => {
        const currentState = get().roleStates[roleId];
        if (!currentState) {
          console.log('Initializing state for role:', roleId);
          const savedState = loadPersistedState(roleId);
          
          if (savedState) {
            set((state) => ({
              roleStates: {
                ...state.roleStates,
                [roleId]: savedState
              },
              currentStates: {
                ...state.currentStates,
                [roleId]: savedState
              },
              originalStates: {
                ...state.originalStates,
                [roleId]: savedState
              }
            }));
          } else {
            const initialState = initializeRoleState(roleId);
            set((state) => ({
              roleStates: {
                ...state.roleStates,
                [roleId]: initialState
              },
              currentStates: {
                ...state.currentStates,
                [roleId]: initialState
              },
              originalStates: {
                ...state.originalStates,
                [roleId]: initialState
              }
            }));
          }
        }
      }
    }),
    {
      name: 'competency-storage',
      version: 20,
      partialize: (state) => ({
        roleStates: state.roleStates,
        currentStates: state.currentStates,
        originalStates: state.originalStates
      }),
      merge: (persistedState: any, currentState: CompetencyState) => {
        console.log('Merging states:', { persistedState, currentState });
        return {
          ...currentState,
          roleStates: {
            ...currentState.roleStates,
            ...persistedState.roleStates
          },
          currentStates: {
            ...currentState.currentStates,
            ...persistedState.currentStates
          },
          originalStates: {
            ...currentState.originalStates,
            ...persistedState.originalStates
          },
          hasChanges: false
        };
      }
    }
  )
);