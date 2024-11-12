import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SkillState {
  level: string;
  requirement: string;  // Changed from 'required' to 'requirement' to match usage
}

interface CompetencyState {
  originalStates: Record<string, Record<string, SkillState>>;
  currentStates: Record<string, Record<string, SkillState>>;
  hasChanges: boolean;
  setSkillState: (skillName: string, level: string, levelKey: string, requirement: string) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
  initializeStates: (states: Record<string, Record<string, SkillState>>) => void;
}

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set) => ({
      originalStates: {},
      currentStates: {},
      hasChanges: false,
      setSkillState: (skillName, level, levelKey, requirement) =>
        set((state) => {
          const newStates = {
            ...state.currentStates,
            [skillName]: {
              ...(state.currentStates[skillName] || {}),
              [levelKey]: { level, requirement },
            },
          };
          const hasChanges = JSON.stringify(newStates) !== JSON.stringify(state.originalStates);
          return { currentStates: newStates, hasChanges };
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
      initializeStates: (states) =>
        set(() => ({
          originalStates: states,
          currentStates: states,
          hasChanges: false,
        })),
    }),
    {
      name: 'competency-storage',
      skipHydration: false,
    }
  )
);