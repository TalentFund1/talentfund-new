import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RoleCompetencyState, CompetencyStorage } from './types/StorageTypes';
import { initializeSkillStates } from './utils/stateInitializer';

interface CompetencyState {
  currentRoleId: string | null;
  currentStates: RoleCompetencyState;
  originalStates: RoleCompetencyState;
  hasChanges: boolean;
  setCurrentRole: (roleId: string) => void;
  setSkillState: (skillTitle: string, level: string, levelKey: string, requirement: string) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
  initializeStates: (roleId: string) => void;
}

const STORAGE_KEY = 'competency-matrix-storage';

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set, get) => ({
      currentRoleId: null,
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setCurrentRole: (roleId: string) => {
        console.log('Setting current role:', roleId);
        const state = get();
        const existingStates = state.currentStates[roleId] || initializeSkillStates(roleId);
        
        set({
          currentRoleId: roleId,
          currentStates: existingStates,
          originalStates: existingStates,
          hasChanges: false
        });
      },

      setSkillState: (skillTitle, level, levelKey, required) => {
        const state = get();
        if (!state.currentRoleId) {
          console.error('No current role ID set');
          return;
        }

        console.log('Setting skill state:', { skillTitle, level, levelKey, required });
        
        set((state) => {
          const newStates = {
            ...state.currentStates,
            [skillTitle]: {
              ...(state.currentStates[skillTitle] || {}),
              [levelKey]: { level, required },
            },
          };
          
          return { 
            currentStates: newStates,
            hasChanges: JSON.stringify(newStates) !== JSON.stringify(state.originalStates)
          };
        });
      },

      saveChanges: () => {
        const state = get();
        if (!state.currentRoleId) {
          console.error('No current role ID set');
          return;
        }

        console.log('Saving changes');
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
          hasChanges: false,
        });
      },

      initializeStates: (roleId: string) => {
        console.log('Initializing states for role:', roleId);
        const state = get();
        
        if (state.currentRoleId !== roleId || !state.currentStates[roleId]) {
          const initializedStates = initializeSkillStates(roleId);
          set({
            currentRoleId: roleId,
            currentStates: initializedStates,
            originalStates: initializedStates,
            hasChanges: false
          });
        }
      },
    }),
    {
      name: STORAGE_KEY,
      // Only persist the states and currentRoleId
      partialize: (state) => ({ 
        currentStates: state.currentStates,
        currentRoleId: state.currentRoleId,
      }),
    }
  )
);