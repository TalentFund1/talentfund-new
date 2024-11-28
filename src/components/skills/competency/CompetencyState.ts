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
        set((state) => ({
          roleStates: resetLevelsAction(state.roleStates, roleId),
          hasChanges: true
        }));
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