import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompetencyState, RoleState } from './state/competencyTypes';
import { loadRoleState, saveRoleState } from './state/storageUtils';
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
          const roleState = state.roleStates[roleId] || {};
          
          const updatedRoleState = {
            ...roleState,
            [skillName]: {
              ...roleState[skillName],
              [levelKey]: { level, required }
            }
          };

          saveRoleState(roleId, updatedRoleState);

          return {
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
        });
      },

      setSkillProgression: (skillName, progression, roleId) => {
        console.log('Setting skill progression:', { skillName, progression, roleId });
        
        set((state) => {
          const roleState = state.roleStates[roleId] || {};
          const updatedRoleState = {
            ...roleState,
            [skillName]: {
              ...roleState[skillName],
              ...progression
            }
          };

          saveRoleState(roleId, updatedRoleState);

          return {
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
        });
      },

      resetLevels: (roleId) => {
        console.log('Resetting levels for role:', roleId);
        const currentState = get().roleStates[roleId] || {};
        const resetState: RoleState = {};

        // Reset each skill to unspecified/preferred
        Object.keys(currentState).forEach(skillName => {
          resetState[skillName] = {};
          Object.keys(currentState[skillName]).forEach(levelKey => {
            resetState[skillName][levelKey] = {
              level: 'unspecified',
              required: 'preferred'
            };
          });
        });
        
        console.log('Reset state:', resetState);
        saveRoleState(roleId, resetState);
        
        set(state => ({
          roleStates: {
            ...state.roleStates,
            [roleId]: resetState
          },
          currentStates: {
            ...state.currentStates,
            [roleId]: resetState
          },
          originalStates: {
            ...state.originalStates,
            [roleId]: resetState
          },
          hasChanges: false
        }));
      },

      saveChanges: (roleId) => {
        console.log('Saving changes for role:', roleId);
        const roleState = get().roleStates[roleId] || {};
        saveRoleState(roleId, roleState);
        
        set((state) => ({
          roleStates: {
            ...state.roleStates,
            [roleId]: roleState
          },
          currentStates: {
            ...state.currentStates,
            [roleId]: roleState
          },
          originalStates: {
            ...state.originalStates,
            [roleId]: roleState
          },
          hasChanges: false
        }));
      },

      cancelChanges: (roleId) => {
        console.log('Cancelling changes for role:', roleId);
        const savedState = loadRoleState(roleId);
        
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
          },
          hasChanges: false
        }));
      },

      initializeState: (roleId) => {
        console.log('Initializing state for role:', roleId);
        const savedState = loadRoleState(roleId);
        
        if (Object.keys(savedState).length > 0) {
          set(state => ({
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
            },
            hasChanges: false
          }));
          return;
        }

        const initialState = initializeRoleState(roleId);
        set(state => ({
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
          },
          hasChanges: false
        }));
      },

      getRoleState: (roleId) => {
        return get().roleStates[roleId] || {};
      }
    }),
    {
      name: 'competency-storage',
      version: 7,
      skipHydration: false,
      partialize: (state) => ({
        roleStates: state.roleStates
      }),
      onRehydrateStorage: () => (state) => {
        console.log('Rehydrated competency state:', state);
      }
    }
  )
);