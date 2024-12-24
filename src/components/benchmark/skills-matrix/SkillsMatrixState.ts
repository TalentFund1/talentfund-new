import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { useEmployeeStore } from '../../employee/store/employeeStore';
import { filterSkillsByCategory } from '../skills-matrix/skillCategories';
import { SkillRequirement } from '../../employee/types/employeeSkillTypes';

interface SkillState {
  level: string;
  requirement: SkillRequirement;
}

interface SkillsMatrixState {
  currentStates: { [key: string]: SkillState };
  originalStates: { [key: string]: SkillState };
  hasChanges: boolean;
  setSkillState: (skillTitle: string, level: string, requirement: SkillRequirement) => void;
  resetSkills: () => void;
  initializeState: (skillTitle: string, level: string, requirement: SkillRequirement) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
}

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set) => ({
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setSkillState: (skillTitle, level, requirement) => {
        console.log('Setting skill state in matrix:', { skillTitle, level, requirement });
        
        // Get current employee ID from URL
        const employeeId = window.location.pathname.split('/').pop();
        
        if (employeeId) {
          // Sync with employee store
          const employeeStore = useEmployeeStore.getState();
          employeeStore.setSkillState(employeeId, skillTitle, level, requirement);
          
          console.log('Synced skill state with employee store:', {
            employeeId,
            skillTitle,
            level,
            requirement
          });
        }

        set((state) => ({
          currentStates: {
            ...state.currentStates,
            [skillTitle]: { level, requirement },
          },
          hasChanges: true,
        }));
      },

      resetSkills: () =>
        set(() => ({
          currentStates: {},
          originalStates: {},
          hasChanges: false,
        })),

      initializeState: (skillTitle, level, requirement) =>
        set((state) => {
          if (!state.currentStates[skillTitle]) {
            console.log('Initializing skill state:', { skillTitle, level, requirement });
            return {
              currentStates: {
                ...state.currentStates,
                [skillTitle]: { level, requirement },
              },
              originalStates: {
                ...state.originalStates,
                [skillTitle]: { level, requirement },
              },
            };
          }
          return state;
        }),

      saveChanges: () => {
        const employeeId = window.location.pathname.split('/').pop();
        if (employeeId) {
          const employeeStore = useEmployeeStore.getState();
          const { currentStates } = useSkillsMatrixStore.getState();
          
          // Sync all changes to employee store
          Object.entries(currentStates).forEach(([skillTitle, state]) => {
            employeeStore.setSkillState(employeeId, skillTitle, state.level, state.requirement);
          });
          
          console.log('Saved all changes to employee store:', {
            employeeId,
            skillCount: Object.keys(currentStates).length
          });
        }

        set((state) => ({
          originalStates: { ...state.currentStates },
          hasChanges: false,
        }));
      },

      cancelChanges: () =>
        set((state) => ({
          currentStates: { ...state.originalStates },
          hasChanges: false,
        })),
    }),
    {
      name: 'skills-matrix-storage',
      version: 2,
      partialize: (state) => ({
        currentStates: state.currentStates,
        originalStates: state.originalStates,
      }),
    }
  )
);