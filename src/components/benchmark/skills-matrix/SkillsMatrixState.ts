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
}

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set) => ({
      originalStates: {},
      currentStates: {},
      hasChanges: false,
      setSkillState: (skillTitle, level, requirement) =>
        set((state) => {
          const newStates = {
            ...state.currentStates,
            [skillTitle]: { level, requirement },
          };
          return { 
            currentStates: newStates,
            hasChanges: JSON.stringify(newStates) !== JSON.stringify(state.originalStates)
          };
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
      partialize: (state) => ({ 
        originalStates: state.originalStates,
        currentStates: state.currentStates 
      }),
    }
  )
);