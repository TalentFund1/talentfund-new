import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RoleCompetencyState, SkillLevelState } from './types/StorageTypes';
import { initializeSkillStates } from './utils/stateInitializer';

interface CompetencyState {
  currentRoleId: string | null;
  currentStates: RoleCompetencyState;
  originalStates: RoleCompetencyState;
  hasChanges: boolean;
  setCurrentRole: (roleId: string) => void;
  setSkillState: (skillTitle: string, level: string, levelKey: string, requirement: string) => void;
  resetAllStates: () => void;
  saveChanges: () => void;
  cancelChanges: () => void;
  initializeStates: (roleId: string) => void;
}

const STORAGE_KEY = 'competency-matrix-storage';

const DEFAULT_SKILL_STATE: SkillLevelState = {
  level: 'unspecified',
  required: 'preferred'
};

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set, get) => ({
      currentRoleId: null,
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setCurrentRole: (roleId: string) => {
        console.log('Setting current role:', roleId);
        const existingStates = get().currentStates[roleId] || initializeSkillStates(roleId);
        
        set({
          currentRoleId: roleId,
          currentStates: { [roleId]: existingStates },
          originalStates: { [roleId]: existingStates },
          hasChanges: false
        });
      },

      setSkillState: (skillTitle, level, levelKey, requirement) => {
        const state = get();
        if (!state.currentRoleId) {
          console.error('No current role ID set');
          return;
        }

        console.log('Setting skill state:', { skillTitle, level, levelKey, requirement });
        
        set((state) => {
          const roleId = state.currentRoleId!;
          const newStates = {
            ...state.currentStates,
            [roleId]: {
              ...(state.currentStates[roleId] || {}),
              [skillTitle]: {
                ...(state.currentStates[roleId]?.[skillTitle] || {}),
                [levelKey]: { level, required: requirement }
              }
            }
          };

          return {
            currentStates: newStates,
            hasChanges: JSON.stringify(newStates) !== JSON.stringify(state.originalStates)
          };
        });
      },

      resetAllStates: () => {
        const state = get();
        if (!state.currentRoleId) {
          console.error('No current role ID set');
          return;
        }

        console.log('Resetting all states to default');
        
        const currentSkills = state.currentStates[state.currentRoleId] || {};
        const resetStates: RoleCompetencyState = {
          [state.currentRoleId]: Object.keys(currentSkills).reduce((acc, skillTitle) => {
            acc[skillTitle] = Object.keys(currentSkills[skillTitle] || {}).reduce((levelAcc, levelKey) => {
              levelAcc[levelKey] = { ...DEFAULT_SKILL_STATE };
              return levelAcc;
            }, {} as Record<string, SkillLevelState>);
            return acc;
          }, {} as RoleSkillState)
        };

        set({
          currentStates: resetStates,
          hasChanges: true
        });
      },

      saveChanges: () => {
        console.log('Saving changes');
        const state = get();
        set({
          originalStates: { ...state.currentStates },
          hasChanges: false
        });
      },

      cancelChanges: () => {
        console.log('Cancelling changes');
        const state = get();
        set({
          currentStates: { ...state.originalStates },
          hasChanges: false
        });
      },

      initializeStates: (roleId: string) => {
        console.log('Initializing states for role:', roleId);
        const state = get();
        
        if (!state.currentStates[roleId]) {
          const initializedStates = initializeSkillStates(roleId);
          
          set({
            currentRoleId: roleId,
            currentStates: { [roleId]: initializedStates },
            originalStates: { [roleId]: initializedStates },
            hasChanges: false
          });
        }
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({ 
        currentStates: state.currentStates,
        currentRoleId: state.currentRoleId,
      }),
    }
  )
);