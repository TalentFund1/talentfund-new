import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { benchmarkingService } from '../../../services/benchmarking';

interface SkillState {
  level: string;
  goalStatus: string;
  lastUpdated: string;
}

interface SkillsMatrixState {
  currentStates: { [key: string]: SkillState };
  originalStates: { [key: string]: SkillState };
  hasChanges: boolean;
  setSkillState: (skillTitle: string, level: string, goalStatus: string) => void;
  resetSkills: () => void;
  initializeState: (skillTitle: string, level: string, goalStatus: string) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
}

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set, get) => ({
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setSkillState: (skillTitle, level, goalStatus) => {
        console.log('Setting skill state in matrix:', { skillTitle, level, goalStatus });
        
        set((state) => {
          // Store original state if this is the first change
          const originalState = state.originalStates[skillTitle] || state.currentStates[skillTitle];
          
          return {
            originalStates: {
              ...state.originalStates,
              [skillTitle]: originalState || benchmarkingService.createSkillState(level, goalStatus)
            },
            currentStates: {
              ...state.currentStates,
              [skillTitle]: benchmarkingService.createSkillState(level, goalStatus)
            },
            hasChanges: true,
          };
        });
      },

      resetSkills: () =>
        set(() => ({
          currentStates: {},
          originalStates: {},
          hasChanges: false,
        })),

      initializeState: (skillTitle, level, goalStatus) =>
        set((state) => {
          if (!state.currentStates[skillTitle]) {
            console.log('Initializing skill state:', { skillTitle, level, goalStatus });
            const newState = benchmarkingService.createSkillState(level, goalStatus);
            return {
              currentStates: {
                ...state.currentStates,
                [skillTitle]: newState
              },
              originalStates: {
                ...state.originalStates,
                [skillTitle]: newState
              }
            };
          }
          return state;
        }),

      saveChanges: () => {
        console.log('Saving changes in matrix store');
        set((state) => ({
          originalStates: { ...state.currentStates },
          hasChanges: false,
        }));
      },

      cancelChanges: () => {
        console.log('Canceling changes in matrix store');
        set((state) => ({
          currentStates: { ...state.originalStates },
          hasChanges: false,
        }));
      },
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