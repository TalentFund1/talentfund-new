import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmployeeSkillState, EmployeeSkillRequirement } from '@/types/skillTypes';
import { useEmployeeStore } from '../../employee/store/employeeStore';

interface SkillsMatrixState {
  currentStates: { [key: string]: EmployeeSkillState };
  originalStates: { [key: string]: EmployeeSkillState };
  hasChanges: boolean;
  setSkillState: (skillId: string, level: string, requirement: EmployeeSkillRequirement, employeeId: string) => void;
  resetSkills: () => void;
  initializeState: (skillId: string, level: string, requirement: EmployeeSkillRequirement, employeeId: string) => void;
  saveChanges: (employeeId: string) => void;
  cancelChanges: () => void;
}

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set) => ({
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setSkillState: (skillId, level, requirement, employeeId) => {
        console.log('Setting skill state:', { skillId, level, requirement, employeeId });
        
        // Update the employee store
        const employeeStore = useEmployeeStore.getState();
        employeeStore.setSkillState(employeeId, skillId, level, requirement);
        
        set((state) => ({
          currentStates: {
            ...state.currentStates,
            [skillId]: { 
              skillId,
              level, 
              requirement 
            },
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

      initializeState: (skillId, level, requirement, employeeId) =>
        set((state) => {
          if (!state.currentStates[skillId]) {
            // Get existing state from employee store
            const employeeStore = useEmployeeStore.getState();
            const existingState = employeeStore.getSkillState(employeeId, skillId);

            if (existingState) {
              return {
                currentStates: {
                  ...state.currentStates,
                  [skillId]: existingState,
                },
                originalStates: {
                  ...state.originalStates,
                  [skillId]: existingState,
                },
              };
            }

            return {
              currentStates: {
                ...state.currentStates,
                [skillId]: { 
                  skillId,
                  level, 
                  requirement 
                },
              },
              originalStates: {
                ...state.originalStates,
                [skillId]: { 
                  skillId,
                  level, 
                  requirement 
                },
              },
            };
          }
          return state;
        }),

      saveChanges: (employeeId) =>
        set((state) => {
          // Update employee store with all current states
          const employeeStore = useEmployeeStore.getState();
          Object.entries(state.currentStates).forEach(([skillId, skillState]) => {
            employeeStore.setSkillState(
              employeeId,
              skillId,
              skillState.level,
              skillState.requirement
            );
          });

          return {
            originalStates: { ...state.currentStates },
            hasChanges: false,
          };
        }),

      cancelChanges: () =>
        set((state) => ({
          currentStates: { ...state.originalStates },
          hasChanges: false,
        })),
    }),
    {
      name: 'skills-matrix-storage',
      version: 1,
      partialize: (state) => ({
        currentStates: state.currentStates,
        originalStates: state.originalStates,
      }),
    }
  )
);