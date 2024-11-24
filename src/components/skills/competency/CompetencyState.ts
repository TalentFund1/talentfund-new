import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompetencyState, SkillLevel, RequirementType, SkillLevelState, RoleCompetencyState } from '../types/CompetencyTypes';

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
        const storageKey = getStorageKey(roleId);
        const savedState = localStorage.getItem(storageKey);
        
        if (savedState) {
          const parsed = JSON.parse(savedState);
          set({
            currentStates: parsed.state.currentStates || {},
            originalStates: parsed.state.originalStates || {},
            hasChanges: false
          });
        } else {
          set({
            currentStates: {},
            originalStates: {},
            hasChanges: false
          });
        }
      },
      setSkillState: (skillTitle: string, level: SkillLevel, levelKey: string, requirement: RequirementType) => {
        console.log('Setting skill state:', { skillTitle, level, levelKey, requirement });
        
        set((state) => {
          const newStates = { ...state.currentStates };
          
          if (!newStates[skillTitle]) {
            newStates[skillTitle] = {};
          }
          
          if (!newStates[skillTitle][levelKey]) {
            newStates[skillTitle][levelKey] = initializeSkillState();
          }
          
          newStates[skillTitle][levelKey] = {
            level,
            required: requirement
          };
          
          console.log('New state:', { skillTitle, levelKey, state: newStates[skillTitle][levelKey] });
          
          const hasChanges = JSON.stringify(newStates) !== JSON.stringify(state.originalStates);
          
          return { 
            currentStates: newStates,
            hasChanges
          };
        });
      },
      saveChanges: () => {
        const state = get();
        const roleId = localStorage.getItem('currentRoleId') || '123';
        const storageKey = getStorageKey(roleId);
        
        const stateToSave = {
          currentStates: state.currentStates,
          originalStates: state.currentStates, // Update original states to match current
          hasChanges: false
        };
        
        localStorage.setItem(storageKey, JSON.stringify({ state: stateToSave }));
        console.log('Saved state to storage:', { roleId, storageKey, state: stateToSave });
        
        set({
          originalStates: { ...state.currentStates },
          hasChanges: false
        });
      },
      cancelChanges: () => {
        set((state) => ({
          currentStates: { ...state.originalStates },
          hasChanges: false,
        }));
      },
      resetToDefaults: () => {
        const roleId = localStorage.getItem('currentRoleId') || '123';
        const storageKey = getStorageKey(roleId);
        localStorage.removeItem(storageKey);
        
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
        getItem: async (name) => {
          const roleId = localStorage.getItem('currentRoleId') || '123';
          const storageKey = getStorageKey(roleId);
          const value = localStorage.getItem(storageKey);
          console.log('Getting stored value:', { roleId, storageKey, value });
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          const roleId = localStorage.getItem('currentRoleId') || '123';
          const storageKey = getStorageKey(roleId);
          console.log('Setting stored value:', { roleId, storageKey, value });
          localStorage.setItem(storageKey, JSON.stringify(value));
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
        hasChanges: state.hasChanges
      }),
    }
  )
);