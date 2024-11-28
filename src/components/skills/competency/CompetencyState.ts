import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompetencyState } from './state/types';
import { setSkillStateAction, setSkillProgressionAction } from './state/stateActions';
import { loadPersistedState } from './state/persistenceUtils';
import { initializeRoleState } from './state/initializeState';

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
          const newRoleStates = setSkillStateAction(
            state.roleStates,
            skillName,
            level,
            levelKey,
            required,
            roleId
          );

          const updatedState = {
            roleStates: newRoleStates,
            currentStates: {
              ...state.currentStates,
              [roleId]: newRoleStates[roleId]
            },
            hasChanges: true
          };

          localStorage.setItem(`competency-state-${roleId}`, JSON.stringify(newRoleStates[roleId]));
          console.log('Persisted updated state for role:', roleId);

          return updatedState;
        });
      },

      setSkillProgression: (skillName, progression, roleId) => {
        console.log('Setting skill progression:', { skillName, progression, roleId });
        set((state) => {
          const newRoleStates = setSkillProgressionAction(
            state.roleStates,
            skillName,
            progression,
            roleId
          );

          const updatedState = {
            roleStates: newRoleStates,
            currentStates: {
              ...state.currentStates,
              [roleId]: newRoleStates[roleId]
            },
            hasChanges: true
          };

          localStorage.setItem(`competency-state-${roleId}`, JSON.stringify(newRoleStates[roleId]));
          console.log('Persisted progression state for role:', roleId);

          return updatedState;
        });
      },

      resetLevels: (roleId) => {
        console.log('Resetting levels for role:', roleId);
        set((state) => {
          const freshState = initializeRoleState(roleId);
          const updatedState = {
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

          localStorage.setItem(`competency-state-${roleId}`, JSON.stringify(freshState));
          console.log('Persisted reset state for role:', roleId);

          return updatedState;
        });
      },

      saveChanges: (roleId) => {
        console.log('Saving changes for role:', roleId);
        set((state) => {
          const currentRoleState = state.roleStates[roleId];
          const updatedState = {
            originalStates: {
              ...state.originalStates,
              [roleId]: { ...currentRoleState }
            },
            hasChanges: false
          };

          localStorage.setItem(`competency-state-${roleId}`, JSON.stringify(currentRoleState));
          console.log('Persisted saved state for role:', roleId);

          return updatedState;
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
            console.log('Loaded saved state for role:', roleId);
            set((state) => ({
              roleStates: {
                ...state.roleStates,
                [roleId]: { ...savedState }
              },
              currentStates: {
                ...state.currentStates,
                [roleId]: { ...savedState }
              },
              originalStates: {
                ...state.originalStates,
                [roleId]: { ...savedState }
              }
            }));
          } else {
            console.log('Creating new state for role:', roleId);
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
      },

      getRoleState: (roleId) => {
        console.log('Getting role state for:', roleId);
        return get().roleStates[roleId] || {};
      }
    }),
    {
      name: 'competency-storage',
      version: 19,
      partialize: (state) => ({
        roleStates: state.roleStates,
        currentStates: state.currentStates,
        originalStates: state.originalStates
      }),
      merge: (persistedState: any, currentState: CompetencyState) => {
        console.log('Merging persisted state with current state');
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
          }
        };
      }
    }
  )
);