import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmployeeSkillState, EmployeeSkillRequirement } from '../../../types/skillTypes';

interface SkillsMatrixState {
  currentStates: { [key: string]: EmployeeSkillState };
  originalStates: { [key: string]: EmployeeSkillState };
  hasChanges: boolean;
  setSkillState: (skillName: string, level: string, requirement: EmployeeSkillRequirement) => void;
  resetSkills: () => void;
  initializeState: (skillName: string, level: string, requirement: EmployeeSkillRequirement) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
}

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set) => ({
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setSkillState: (skillName, level, requirement) => {
        console.log('Setting skill state:', { skillName, level, requirement });
        
        let finalRequirement: EmployeeSkillRequirement = requirement;
        
        set((state) => ({
          currentStates: {
            ...state.currentStates,
            [skillName]: { 
              level, 
              requirement: finalRequirement 
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

      initializeState: (skillName, level, requirement) =>
        set((state) => {
          if (!state.currentStates[skillName]) {
            let finalRequirement: EmployeeSkillRequirement = requirement;

            return {
              currentStates: {
                ...state.currentStates,
                [skillName]: { 
                  level, 
                  requirement: finalRequirement 
                },
              },
              originalStates: {
                ...state.originalStates,
                [skillName]: { 
                  level, 
                  requirement: finalRequirement 
                },
              },
            };
          }
          return state;
        }),

      saveChanges: () =>
        set((state) => ({
          originalStates: { ...state.currentStates },
          hasChanges: false,
        })),

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