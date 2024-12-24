import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
        console.log('Setting skill state:', { skillTitle, level, requirement });
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
      version: 2,
      partialize: (state) => ({
        currentStates: state.currentStates,
        originalStates: state.originalStates,
      }),
    }
  )
);

// Add the missing export
export const useSkillsMatrixState = useSkillsMatrixStore;