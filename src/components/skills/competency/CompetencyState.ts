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
        set({
          currentStates: {},
          originalStates: {},
          hasChanges: false
        });
      },
      setSkillState: (skillTitle: string, level: SkillLevel, levelKey: string, requirement: RequirementType) => {
        console.log('Setting skill state:', { skillTitle, level, levelKey, requirement });
        
        set((state) => {
          const newStates = JSON.parse(JSON.stringify(state.currentStates)) as RoleCompetencyState;
          
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
          
          const hasChanges = JSON.stringify(newStates) !== JSON.stringify(state.originalStates);
          
          return {
            currentStates: newStates,
            hasChanges
          };
        });
      },
      saveChanges: () => {
        set((state) => ({
          originalStates: JSON.parse(JSON.stringify(state.currentStates)),
          hasChanges: false,
        }));
      },
      cancelChanges: () => {
        set((state) => ({
          currentStates: JSON.parse(JSON.stringify(state.originalStates)),
          hasChanges: false,
        }));
      },
      resetToDefaults: () => {
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
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          const roleId = localStorage.getItem('currentRoleId') || '123';
          const storageKey = getStorageKey(roleId);
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