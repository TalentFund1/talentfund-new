import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SkillRequirement } from '../../employee/types/employeeSkillTypes';

interface SkillState {
  level: string;
  requirement: SkillRequirement;
}

interface SkillsMatrixState {
  currentStates: { [key: string]: SkillState };
  setSkillState: (skillTitle: string, level: string, requirement: SkillRequirement) => void;
  initializeState: (skillTitle: string, level: string, requirement: SkillRequirement) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
}

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set) => ({
      currentStates: {},

      setSkillState: (skillTitle, level, requirement) => {
        console.log('Setting skill state:', { skillTitle, level, requirement });
        set((state) => ({
          currentStates: {
            ...state.currentStates,
            [skillTitle]: { level, requirement }
          }
        }));
      },

      initializeState: (skillTitle, level, requirement) => {
        console.log('Initializing skill state:', { skillTitle, level, requirement });
        set((state) => {
          if (!state.currentStates[skillTitle]) {
            return {
              currentStates: {
                ...state.currentStates,
                [skillTitle]: { level, requirement }
              }
            };
          }
          return state;
        });
      },

      saveChanges: () => {
        console.log('Saving changes');
      },

      cancelChanges: () => {
        console.log('Canceling changes');
      }
    }),
    {
      name: 'skills-matrix-storage',
      version: 1
    }
  )
);