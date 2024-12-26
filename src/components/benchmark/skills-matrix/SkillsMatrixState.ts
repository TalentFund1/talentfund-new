import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BenchmarkState {
  roleId: string;
  level: string;
  required: string;
}

interface SkillsMatrixState {
  benchmarkStates: { [key: string]: BenchmarkState };
  hasChanges: boolean;
  setBenchmarkState: (skillTitle: string, roleId: string, level: string, required: string) => void;
  resetBenchmarks: () => void;
  initializeBenchmark: (skillTitle: string, roleId: string, level: string, required: string) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
}

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set) => ({
      benchmarkStates: {},
      hasChanges: false,

      setBenchmarkState: (skillTitle, roleId, level, required) => {
        console.log('Setting benchmark state:', { skillTitle, roleId, level, required });
        
        set((state) => ({
          benchmarkStates: {
            ...state.benchmarkStates,
            [skillTitle]: { roleId, level, required }
          },
          hasChanges: true,
        }));
      },

      resetBenchmarks: () =>
        set(() => ({
          benchmarkStates: {},
          hasChanges: false,
        })),

      initializeBenchmark: (skillTitle, roleId, level, required) =>
        set((state) => {
          if (!state.benchmarkStates[skillTitle]) {
            console.log('Initializing benchmark state:', { skillTitle, roleId, level, required });
            return {
              benchmarkStates: {
                ...state.benchmarkStates,
                [skillTitle]: { roleId, level, required }
              },
            };
          }
          return state;
        }),

      saveChanges: () => {
        set(() => ({
          hasChanges: false,
        }));
      },

      cancelChanges: () =>
        set(() => ({
          hasChanges: false,
        })),
    }),
    {
      name: 'skills-matrix-storage',
      version: 3,
      partialize: (state) => ({
        benchmarkStates: state.benchmarkStates,
      }),
    }
  )
);