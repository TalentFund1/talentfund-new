import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompetencyState, StorageValue } from './types/CompetencyTypes';
import { getStorageKey, saveToStorage, loadFromStorage } from './utils/storageUtils';
import { initializeSkillStates } from './utils/stateInitializer';

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set, get) => ({
      currentStates: {},
      originalStates: {},
      hasChanges: false,
      initializeStates: (roleId: string) => {
        console.log('Initializing states for role:', roleId);
        const storageKey = getStorageKey(roleId);
        
        try {
          const storedValue = loadFromStorage(storageKey);
          let initializedStates;
          
          if (storedValue?.state?.currentStates) {
            initializedStates = storedValue.state.currentStates;
            console.log('Found stored states:', initializedStates);
          } else {
            initializedStates = initializeSkillStates(roleId);
            console.log('No stored states found, using default:', initializedStates);
          }
          
          set({
            currentStates: initializedStates,
            originalStates: initializedStates,
            hasChanges: false
          });
        } catch (error) {
          console.error('Error initializing states:', error);
          const defaultStates = initializeSkillStates(roleId);
          set({
            currentStates: defaultStates,
            originalStates: defaultStates,
            hasChanges: false
          });
        }
      },
      setSkillState: (skillName, level, levelKey, required) => {
        console.log('Setting skill state:', { skillName, level, levelKey, required });
        
        set((state) => {
          const newStates = {
            ...state.currentStates,
            [skillName]: {
              ...(state.currentStates[skillName] || {}),
              [levelKey]: { level, required },
            },
          };
          
          const hasChanges = JSON.stringify(newStates) !== JSON.stringify(state.originalStates);
          console.log('New states:', newStates);
          console.log('Has changes:', hasChanges);
          
          return {
            currentStates: newStates,
            hasChanges,
          };
        });
      },
      saveChanges: () => {
        const roleId = localStorage.getItem('currentRoleId') || '126';
        const storageKey = getStorageKey(roleId);
        
        set((state) => {
          const stateToSave: StorageValue<CompetencyState> = {
            state: {
              currentStates: state.currentStates,
              originalStates: state.currentStates,
              hasChanges: false,
              setSkillState: () => {},
              saveChanges: () => {},
              cancelChanges: () => {},
              initializeStates: () => {},
            },
            version: 1
          };
          
          saveToStorage(storageKey, stateToSave);
          
          return {
            currentStates: state.currentStates,
            originalStates: state.currentStates,
            hasChanges: false
          };
        });
      },
      cancelChanges: () => {
        console.log('Cancelling changes');
        set((state) => ({
          currentStates: { ...state.originalStates },
          hasChanges: false,
        }));
      },
    }),
    {
      name: 'competency-storage',
      storage: {
        getItem: async (name): Promise<StorageValue<CompetencyState> | null> => {
          const roleId = localStorage.getItem('currentRoleId') || '126';
          const storageKey = getStorageKey(roleId);
          return loadFromStorage(storageKey);
        },
        setItem: async (name, value: StorageValue<CompetencyState>) => {
          const roleId = localStorage.getItem('currentRoleId') || '126';
          const storageKey = getStorageKey(roleId);
          saveToStorage(storageKey, value);
        },
        removeItem: async (name) => {
          const roleId = localStorage.getItem('currentRoleId') || '126';
          const storageKey = getStorageKey(roleId);
          localStorage.removeItem(storageKey);
          console.log('Removed stored state for role:', roleId);
        },
      },
    }
  )
);