import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SkillState {
  level: string;
  required: string;
}

interface CompetencyState {
  currentStates: Record<string, Record<string, SkillState>>;
  hasChanges: boolean;
  setSkillState: (skillName: string, level: string, levelKey: string, required: string) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
}

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set) => ({
      currentStates: {},
      hasChanges: false,
      setSkillState: (skillName, level, levelKey, required) =>
        set((state) => ({
          currentStates: {
            ...state.currentStates,
            [skillName]: {
              ...state.currentStates[skillName],
              [levelKey]: {
                level: level || "unspecified",
                required: required || "preferred",
              },
            },
          },
          hasChanges: true,
        })),
      saveChanges: () => set({ hasChanges: false }),
      cancelChanges: () =>
        set({
          currentStates: {},
          hasChanges: false,
        }),
    }),
    {
      name: 'competency-storage',
      skipHydration: false,
    }
  )
);