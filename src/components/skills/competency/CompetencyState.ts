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
        console.log('Setting skill state:', { skillName, level, levelKey, required, roleId });
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
        console.log('Setting skill progression:', { skillName, progression, roleId });
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
          const newState = resetLevelsAction(state.roleStates, roleId);
          console.log('Reset state result:', newState);
          return {
            roleStates: newState,
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
        
        if (!currentState) {
          set((state) => {
            const newState = {};
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
      version: 10, // Increment version to force reset of persisted state
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