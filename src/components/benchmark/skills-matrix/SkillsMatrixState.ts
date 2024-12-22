import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmployeeSkillState, EmployeeSkillRequirement, ProfileSkillStates } from '@/types/skillTypes';
import { useEmployeeStore } from '../../employee/store/employeeStore';
import { generateSkillId } from '@/components/skills/data/skillDatabaseService';

interface SkillsMatrixState {
  currentStates: ProfileSkillStates;
  originalStates: ProfileSkillStates;
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
            [employeeId]: {
              ...state.currentStates[employeeId],
              [skillId]: { 
                skillId,
                level, 
                requirement 
              },
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
          if (!state.currentStates[employeeId]?.[skillId]) {
            // Get existing state from employee store
            const employeeStore = useEmployeeStore.getState();
            const existingState = employeeStore.getSkillState(employeeId, skillId);

            if (existingState) {
              return {
                currentStates: {
                  ...state.currentStates,
                  [employeeId]: {
                    ...state.currentStates[employeeId],
                    [skillId]: existingState,
                  },
                },
                originalStates: {
                  ...state.originalStates,
                  [employeeId]: {
                    ...state.originalStates[employeeId],
                    [skillId]: existingState,
                  },
                },
              };
            }

            return {
              currentStates: {
                ...state.currentStates,
                [employeeId]: {
                  ...state.currentStates[employeeId],
                  [skillId]: { 
                    skillId,
                    level, 
                    requirement 
                  },
                },
              },
              originalStates: {
                ...state.originalStates,
                [employeeId]: {
                  ...state.originalStates[employeeId],
                  [skillId]: { 
                    skillId,
                    level, 
                    requirement 
                  },
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
          Object.entries(state.currentStates[employeeId] || {}).forEach(([skillId, skillState]) => {
            employeeStore.setSkillState(
              employeeId,
              skillId,
              skillState.level,
              skillState.requirement
            );
          });

          return {
            originalStates: {
              ...state.originalStates,
              [employeeId]: { ...state.currentStates[employeeId] },
            },
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

export const getEmployeeSkills = (id: string) => {
  console.log('Getting skills for employee:', id);
  const skills = useEmployeeStore.getState().getEmployeeSkills(id);
  // Ensure all skills have consistent IDs
  return skills.map(skill => ({
    ...skill,
    id: generateSkillId(skill.title)
  }));
};