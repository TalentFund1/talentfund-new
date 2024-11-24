import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RoleCompetencyState, SkillLevelState, CompetencyStorage } from './types/StorageTypes';
import { saveToStorage, loadRoleState, getStorageKey } from './utils/storageUtils';
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

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set, get) => ({
      currentRoleId: null,
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setCurrentRole: (roleId: string) => {
        console.log('Setting current role:', roleId);
        const existingState = loadRoleState(roleId);
        
        if (existingState) {
          console.log('Found existing state for role:', roleId);
          set({
            currentRoleId: roleId,
            currentStates: existingState,
            originalStates: existingState,
            hasChanges: false
          });
        } else {
          console.log('Initializing new state for role:', roleId);
          const initializedStates = initializeSkillStates(roleId);
          set({
            currentRoleId: roleId,
            currentStates: initializedStates,
            originalStates: initializedStates,
            hasChanges: false
          });
        }
      },

      setSkillState: (skillTitle, level, levelKey, required) => {
        const { currentRoleId } = get();
        if (!currentRoleId) {
          console.error('No current role ID set');
          return;
        }

        console.log('Setting skill state:', { skillTitle, level, levelKey, required, roleId: currentRoleId });
        
        set((state) => {
          const newStates = {
            ...state.currentStates,
            [skillTitle]: {
              ...(state.currentStates[skillTitle] || {}),
              [levelKey]: { level, required },
            },
          };
          
          const hasChanges = JSON.stringify(newStates) !== JSON.stringify(state.originalStates);
          
          return { 
            currentStates: newStates,
            hasChanges
          };
        });
      },

      saveChanges: () => {
        const { currentRoleId, currentStates } = get();
        if (!currentRoleId) {
          console.error('No current role ID set');
          return;
        }

        console.log('Saving changes for role:', currentRoleId);
        
        const storageData: CompetencyStorage = {
          [currentRoleId]: currentStates
        };
        
        saveToStorage(currentRoleId, storageData);
        
        set({
          originalStates: currentStates,
          hasChanges: false
        });
      },

      cancelChanges: () => {
        console.log('Cancelling changes');
        set((state) => ({
          currentStates: { ...state.originalStates },
          hasChanges: false,
        }));
      },

      initializeStates: (roleId: string) => {
        console.log('Initializing states for role:', roleId);
        set({ currentRoleId: roleId });
        
        const existingState = loadRoleState(roleId);
        
        if (existingState) {
          console.log('Found existing state:', existingState);
          set({
            currentStates: existingState,
            originalStates: existingState,
            hasChanges: false
          });
        } else {
          console.log('Creating new state');
          const initializedStates = initializeSkillStates(roleId);
          set({
            currentStates: initializedStates,
            originalStates: initializedStates,
            hasChanges: false
          });
        }
      },
    }),
    {
      name: getStorageKey(),
      storage: {
        getItem: async (name) => {
          const storage = loadRoleState(get().currentRoleId || '');
          return storage ? { state: storage } : null;
        },
        setItem: async (name, value) => {
          const { currentRoleId } = get();
          if (currentRoleId && value.state) {
            const storageData: CompetencyStorage = {
              [currentRoleId]: value.state
            };
            saveToStorage(currentRoleId, storageData);
          }
        },
        removeItem: async (name) => {
          localStorage.removeItem(getStorageKey());
        },
      },
    }
  )
);