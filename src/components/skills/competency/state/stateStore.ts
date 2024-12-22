import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompetencyState, RoleState, SkillState } from './types';
import { initializeRoleState } from './initializeState';
import { persistState } from './persistenceUtils';

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
          const currentRoleState = state.roleStates[roleId] || {};
          const updatedRoleState = {
            ...currentRoleState,
            [skillName]: {
              ...(currentRoleState[skillName] || {}),
              [levelKey]: { 
                level, 
                required,
                requirement: required 
              }
            }
          };

          const newState = {
            roleStates: {
              ...state.roleStates,
              [roleId]: updatedRoleState
            },
            currentStates: {
              ...state.currentStates,
              [roleId]: updatedRoleState
            },
            hasChanges: true
          };

          persistState(roleId, updatedRoleState);
          return newState;
        });
      },

      setSkillProgression: (skillName, progression, roleId, track) => {
        console.log('Setting skill progression:', { skillName, progression, roleId, track });
        set((state) => {
          const currentRoleState = state.roleStates[roleId] || {};
          const updatedRoleState = {
            ...currentRoleState,
            [skillName]: {
              ...(currentRoleState[skillName] || {}),
              ...progression
            }
          };

          const newState = {
            roleStates: {
              ...state.roleStates,
              [roleId]: updatedRoleState
            },
            currentStates: {
              ...state.currentStates,
              [roleId]: updatedRoleState
            },
            hasChanges: true
          };

          persistState(roleId, updatedRoleState);
          return newState;
        });
      },

      resetLevels: (roleId) => {
        console.log('Resetting levels for role:', roleId);
        const freshState = initializeRoleState(roleId);
        set((state) => ({
          roleStates: {
            ...state.roleStates,
            [roleId]: freshState
          },
          currentStates: {
            ...state.currentStates,
            [roleId]: freshState
          },
          hasChanges: true
        }));
        persistState(roleId, freshState);
      },

      saveChanges: (roleId, track) => {
        console.log('Saving changes for role:', roleId);
        set((state) => {
          const currentRoleState = state.roleStates[roleId];
          persistState(roleId, currentRoleState);
          return {
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
      },

      getRoleState: (roleId) => {
        return get().roleStates[roleId] || {};
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