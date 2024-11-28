import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompetencyState } from './state/types';
import { setSkillStateAction, setSkillProgressionAction } from './state/competencyActions';
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
          const newRoleStates = setSkillStateAction(
            state.roleStates,
            skillName,
            level,
            levelKey,
            required,
            roleId
          );

          // Ensure we update both roleStates and currentStates
          const newState = {
            roleStates: newRoleStates,
            currentStates: {
              ...state.currentStates,
              [roleId]: newRoleStates[roleId]
            },
            hasChanges: true
          };

          // Save to localStorage immediately
          saveRoleState(roleId, newRoleStates[roleId]);
          
          return newState;
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

          const newState = {
            roleStates: newRoleStates,
            currentStates: {
              ...state.currentStates,
              [roleId]: newRoleStates[roleId]
            },
            hasChanges: true
          };

          saveRoleState(roleId, newRoleStates[roleId]);
          
          return newState;
        });
      },

      resetLevels: (roleId) => {
        console.log('Resetting levels for role:', roleId);
        
        set((state) => {
          // Initialize a fresh state for the role
          const freshState = initializeRoleState(roleId);
          
          const newState = {
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

          // Save the reset state to localStorage
          saveRoleState(roleId, freshState);
          
          console.log('Reset state completed:', {
            roleId,
            newState: freshState
          });
          
          return newState;
        });
      },

      saveChanges: (roleId) => {
        console.log('Saving changes for role:', roleId);
        
        set((state) => {
          const currentRoleState = state.roleStates[roleId];
          saveRoleState(roleId, currentRoleState);
          
          return {
            originalStates: {
              ...state.originalStates,
              [roleId]: currentRoleState
            },
            hasChanges: false
          };
        });
      },

      cancelChanges: (roleId) => {
        console.log('Cancelling changes for role:', roleId);
        
        set((state) => {
          const originalRoleState = state.originalStates[roleId];
          return {
            roleStates: {
              ...state.roleStates,
              [roleId]: originalRoleState
            },
            currentStates: {
              ...state.currentStates,
              [roleId]: originalRoleState
            },
            hasChanges: false
          };
        });
      },

      initializeState: (roleId) => {
        console.log('Initializing state for role:', roleId);
        
        const currentState = get().roleStates[roleId];
        if (!currentState) {
          // Try to load from localStorage first
          const savedState = loadRoleState(roleId);
          
          if (Object.keys(savedState).length > 0) {
            console.log('Loaded saved state for role:', roleId);
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
            // Initialize with default state if no saved state exists
            console.log('Initializing new state for role:', roleId);
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
      version: 16,
      skipHydration: false,
      partialize: (state) => ({
        roleStates: state.roleStates,
        currentStates: state.currentStates,
        originalStates: state.originalStates
      }),
      onRehydrateStorage: () => (state) => {
        console.log('Rehydrated competency state:', state);
        if (state) {
          const roleIds = Object.keys(state.roleStates);
          roleIds.forEach(roleId => {
            state.initializeState(roleId);
          });
        }
      }
    }
  )
);