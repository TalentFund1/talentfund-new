import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SkillState {
  level: string;
  requirement: string;
}

interface SkillsMatrixState {
  originalStates: Record<string, SkillState>;
  currentStates: Record<string, SkillState>;
  hasChanges: boolean;
  setSkillState: (skillTitle: string, level: string, requirement: string) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
  initializeState: (skillTitle: string, initialLevel: string, initialRequirement: string) => void;
}

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set, get) => ({
      originalStates: {},
      currentStates: {},
      hasChanges: false,
      initializeState: (skillTitle, initialLevel, initialRequirement) => {
        const currentState = get().currentStates[skillTitle];
        if (!currentState) {
          console.log('Initializing matrix skill state:', { 
            skillTitle, 
            initialLevel: initialLevel || 'unspecified',
            initialRequirement: initialRequirement || 'required'
          });
          
          // Ensure we have valid values
          const level = initialLevel?.toLowerCase() || 'unspecified';
          const requirement = initialRequirement?.toLowerCase() || 'required';
          
          set((state) => ({
            currentStates: {
              ...state.currentStates,
              [skillTitle]: {
                level,
                requirement
              }
            },
            originalStates: {
              ...state.originalStates,
              [skillTitle]: {
                level,
                requirement
              }
            }
          }));
        }
      },
      setSkillState: (skillTitle, level, requirement) => {
        console.log('Setting matrix skill state:', { skillTitle, level, requirement });
        set((state) => {
          const newStates = {
            ...state.currentStates,
            [skillTitle]: { 
              level: level?.toLowerCase() || 'unspecified', 
              requirement: requirement?.toLowerCase() || 'required' 
            },
          };
          
          const hasChanges = JSON.stringify(newStates) !== JSON.stringify(state.originalStates);
          
          return { 
            currentStates: newStates,
            hasChanges
          };
        });
      },
      saveChanges: () =>
        set((state) => {
          console.log('Saving matrix changes');
          return {
            originalStates: { ...state.currentStates },
            hasChanges: false,
          };
        }),
      cancelChanges: () =>
        set((state) => {
          console.log('Cancelling matrix changes');
          return {
            currentStates: { ...state.originalStates },
            hasChanges: false,
          };
        }),
    }),
    {
      name: 'skills-matrix-storage',
      skipHydration: false,
      partialize: (state) => ({
        originalStates: state.originalStates,
        currentStates: state.currentStates,
      }),
    }
  )
);