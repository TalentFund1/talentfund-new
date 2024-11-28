import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompetencyStateStore } from './state/types';
import { setSkillStateAction, setSkillProgressionAction } from './state/stateActions';
import { loadPersistedState } from './state/persistenceUtils';
import { initializeRoleState } from './state/initializeState';

export const useCompetencyStore = create<CompetencyStateStore>()(
  persist(
    (set, get) => ({
      roleStates: {},
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setSkillState: (skillName, level, levelKey, required, roleId) => {
        console.log('Setting skill state:', { skillName, level, levelKey, required, roleId });
        set((state) => {
          const result = setSkillStateAction(
            state.roleStates,
            skillName,
            level,
            levelKey,
            required,
            roleId
          );

          return {
            ...state,
            roleStates: result.roleStates,
            currentStates: {
              ...state.currentStates,
              [roleId]: result.roleStates[roleId]
            },
            hasChanges: result.hasChanges
          };
        });
      },

      setSkillProgression: (skillName, progression, roleId) => {
        console.log('Setting skill progression:', { skillName, progression, roleId });
        set((state) => {
          const result = setSkillProgressionAction(
            state.roleStates,
            skillName,
            progression,
            roleId
          );

          return {
            ...state,
            roleStates: result.roleStates,
            currentStates: {
              ...state.currentStates,
              [roleId]: result.roleStates[roleId]
            },
            hasChanges: result.hasChanges
          };
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
        set((state) => ({
          ...state,
          originalStates: {
            ...state.originalStates,
            [roleId]: { ...state.roleStates[roleId] }
          },
          hasChanges: false
        }));
      },

      cancelChanges: (roleId) => {
        console.log('Canceling changes for role:', roleId);
        set((state) => ({
          ...state,
          roleStates: {
            ...state.roleStates,
            [roleId]: { ...state.originalStates[roleId] }
          },
          currentStates: {
            ...state.currentStates,
            [roleId]: { ...state.originalStates[roleId] }
          },
          hasChanges: false
        }));
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
      },

      getRoleState: (roleId) => {
        return get().roleStates[roleId] || {};
      }
    }),
    {
      name: 'competency-storage',
      version: 20,
      partialize: (state) => ({
        roleStates: state.roleStates,
        currentStates: state.currentStates,
        originalStates: state.originalStates
      })
    }
  )
);