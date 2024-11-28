import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompetencyState } from './state/competencyTypes';
import { 
  setSkillStateAction, 
  setSkillProgressionAction,
  resetLevelsAction 
} from './state/competencyActions';

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set, get) => ({
      roleStates: {},
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setSkillState: (skillName, level, levelKey, required, roleId) => {
        set((state) => ({
          roleStates: setSkillStateAction(
            state.roleStates,
            skillName,
            level,
            levelKey,
            required,
            roleId
          ),
          hasChanges: true
        }));
      },

      setSkillProgression: (skillName, progression, roleId) => {
        set((state) => ({
          roleStates: setSkillProgressionAction(
            state.roleStates,
            skillName,
            progression,
            roleId
          ),
          hasChanges: true
        }));
      },

      resetLevels: (roleId) => {
        console.log('Resetting levels for role:', roleId);
        set((state) => {
          const currentRoleState = state.roleStates[roleId] || {};
          const resetState = {};
          
          // Reset each skill to unspecified/preferred for all levels
          Object.keys(currentRoleState).forEach(skillName => {
            resetState[skillName] = {};
            ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'm3', 'm4', 'm5', 'm6'].forEach(level => {
              resetState[skillName][level] = {
                level: 'unspecified',
                required: 'preferred'
              };
            });
          });

          console.log('Reset state:', resetState);
          
          return {
            roleStates: {
              ...state.roleStates,
              [roleId]: resetState
            },
            hasChanges: true
          };
        });
      },

      saveChanges: (roleId) => {
        console.log('Saving changes for role:', roleId);
        set({ hasChanges: false });
      },

      cancelChanges: (roleId) => {
        console.log('Cancelling changes for role:', roleId);
        set({ hasChanges: false });
      },

      initializeState: (roleId) => {
        console.log('Initializing state for role:', roleId);
        const currentState = get().roleStates[roleId];
        
        // Only initialize if the state doesn't exist yet
        if (!currentState) {
          set((state) => {
            const newState = {};
            // Initialize all skills with unspecified level and preferred requirement
            Object.keys(state.roleStates[roleId] || {}).forEach(skillName => {
              newState[skillName] = {};
              ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'm3', 'm4', 'm5', 'm6'].forEach(level => {
                newState[skillName][level] = {
                  level: 'unspecified',
                  required: 'preferred'
                };
              });
            });
            
            return {
              roleStates: {
                ...state.roleStates,
                [roleId]: newState
              }
            };
          });
        }
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