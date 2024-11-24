import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompetencyState, SkillLevel, RequirementType, SkillLevelState } from '../types/CompetencyTypes';

const getStorageKey = (roleId: string) => `competency-states-${roleId}`;

const initializeSkillState = (): SkillLevelState => ({
  level: "unspecified",
  required: "preferred"
});

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set, get) => ({
      currentStates: {},
      originalStates: {},
      hasChanges: false,
      initializeStates: (roleId: string) => {
        console.log('Initializing states for role:', roleId);
        set({
          currentStates: {},
          originalStates: {},
          hasChanges: false
        });
      },
      setSkillState: (skillTitle: string, level: SkillLevel, levelKey: string, requirement: RequirementType) => {
        console.log('Setting skill state:', { skillTitle, level, levelKey, requirement });
        
        set((state) => {
          // Create a deep copy of the current states
          const newStates = JSON.parse(JSON.stringify(state.currentStates));
          
          // Initialize the skill object if it doesn't exist
          if (!newStates[skillTitle]) {
            newStates[skillTitle] = {};
          }
          
          // Initialize the level object if it doesn't exist
          if (!newStates[skillTitle][levelKey]) {
            newStates[skillTitle][levelKey] = initializeSkillState();
          }
          
          // Update the state
          newStates[skillTitle][levelKey] = {
            level,
            required: requirement
          };
          
          console.log('Updated state:', newStates[skillTitle][levelKey]);
          
          const hasChanges = JSON.stringify(newStates) !== JSON.stringify(state.originalStates);
          
          return {
            currentStates: newStates,
            hasChanges
          };
        });
      },
      saveChanges: () => {
        console.log('Saving changes');
        set((state) => {
          const newOriginalStates = JSON.parse(JSON.stringify(state.currentStates));
          return {
            originalStates: newOriginalStates,
            hasChanges: false,
          };
        });
      },
      cancelChanges: () => {
        console.log('Cancelling changes');
        set((state) => ({
          currentStates: JSON.parse(JSON.stringify(state.originalStates)),
          hasChanges: false,
        }));
      },
      resetToDefaults: () => {
        console.log('Resetting to defaults');
        set({
          currentStates: {},
          originalStates: {},
          hasChanges: false
        });
      }
    }),
    {
      name: 'competency-storage',
      storage: {
        getItem: async (name): Promise<string | null> => {
          const roleId = localStorage.getItem('currentRoleId') || '123';
          const storageKey = getStorageKey(roleId);
          const value = localStorage.getItem(storageKey);
          console.log('Getting stored value:', { roleId, storageKey, value });
          return value;
        },
        setItem: async (name, value) => {
          const roleId = localStorage.getItem('currentRoleId') || '123';
          const storageKey = getStorageKey(roleId);
          console.log('Setting stored value:', { roleId, storageKey, value });
          localStorage.setItem(storageKey, value);
        },
        removeItem: async (name) => {
          const roleId = localStorage.getItem('currentRoleId') || '123';
          const storageKey = getStorageKey(roleId);
          localStorage.removeItem(storageKey);
        },
      },
      partialize: (state) => ({
        currentStates: state.currentStates,
        originalStates: state.originalStates,
      }),
    }
  )
);