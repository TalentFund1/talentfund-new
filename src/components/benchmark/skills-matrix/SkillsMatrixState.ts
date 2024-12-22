import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmployeeSkillState, EmployeeSkillRequirement } from '../../../types/skillTypes';

interface SkillsMatrixState {
  currentStates: { [key: string]: EmployeeSkillState };
  originalStates: { [key: string]: EmployeeSkillState };
  hasChanges: boolean;
  setSkillState: (skillName: string, level: string, requirement: string) => void;
  resetSkills: () => void;
  initializeState: (skillName: string, level: string, requirement: string) => void;
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
        
        // Map the requirement to the correct EmployeeSkillRequirement type
        let finalRequirement: EmployeeSkillRequirement;
        if (requirement === 'skill_goal' || requirement === 'required') {
          finalRequirement = 'skill_goal';
        } else if (requirement === 'not_interested' || requirement === 'not-interested') {
          finalRequirement = 'not_interested';
        } else {
          finalRequirement = 'unknown';
        }
        
        console.log('Final requirement:', {
          original: requirement,
          final: finalRequirement
        });
        
        set((state) => ({
          currentStates: {
            ...state.currentStates,
            [skillName]: { 
              id: skillName, // Using skillName as id since it's unique
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
            // Map the requirement to the correct EmployeeSkillRequirement type
            let finalRequirement: EmployeeSkillRequirement;
            if (requirement === 'skill_goal' || requirement === 'required') {
              finalRequirement = 'skill_goal';
            } else if (requirement === 'not_interested' || requirement === 'not-interested') {
              finalRequirement = 'not_interested';
            } else {
              finalRequirement = 'unknown';
            }

            console.log('Initializing skill state:', { 
              skillName, 
              level, 
              originalRequirement: requirement,
              finalRequirement 
            });
            
            return {
              currentStates: {
                ...state.currentStates,
                [skillName]: { 
                  id: skillName, // Using skillName as id since it's unique
                  level, 
                  requirement: finalRequirement 
                },
              },
              originalStates: {
                ...state.originalStates,
                [skillName]: { 
                  id: skillName, // Using skillName as id since it's unique
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
