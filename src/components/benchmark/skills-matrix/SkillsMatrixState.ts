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
          console.log('Initializing matrix skill state:', { skillTitle, initialLevel, initialRequirement });
          set((state) => {
            // Only initialize if the state doesn't exist yet
            if (!state.currentStates[skillTitle]) {
              const newState = {
                level: initialLevel || 'unspecified',
                requirement: initialRequirement || 'required'
              };
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
          });
        }
      },
      setSkillState: (skillTitle, level, requirement) => {
        console.log('Setting matrix skill state:', { skillTitle, level, requirement });
        set((state) => {
          const newStates = {
            ...state.currentStates,
            [skillTitle]: { level, requirement },
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