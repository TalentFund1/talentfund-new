import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SkillState {
  level: string;
  required: string;
}

interface CompetencyState {
  currentStates: Record<string, Record<string, SkillState>>;
  setSkillState: (skillName: string, level: string, levelKey: string, required: string) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
}

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set) => ({
      currentStates: {},
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
        })),
      saveChanges: () => set((state) => ({ ...state })),
      cancelChanges: () =>
        set((state) => ({
          currentStates: {},
        })),
    }),
    {
      name: 'competency-storage',
      skipHydration: false,
    }
  )
);