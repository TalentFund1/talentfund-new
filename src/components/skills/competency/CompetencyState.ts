import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SkillState {
  level: string;
  required: string;
}

interface CompetencyState {
  currentStates: Record<string, Record<string, SkillState>>;
  originalStates: Record<string, Record<string, SkillState>>;
  hasChanges: boolean;
  setSkillState: (skillName: string, level: string, levelKey: string, required: string) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
  get: () => Pick<CompetencyState, 'currentStates' | 'originalStates'>;
}

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set, get) => ({
      currentStates: {},
      originalStates: {},
      hasChanges: false,
      setSkillState: (skillName, level, levelKey, required) =>
        set((state) => {
          if (!state.originalStates[skillName]?.[levelKey]) {
            return {
              originalStates: {
                ...state.originalStates,
                [skillName]: {
                  ...state.originalStates[skillName],
                  [levelKey]: {
                    level: state.currentStates[skillName]?.[levelKey]?.level || "unspecified",
                    required: state.currentStates[skillName]?.[levelKey]?.required || "preferred",
                  },
                },
              },
              currentStates: {
                ...state.currentStates,
                [skillName]: {
                  ...state.currentStates[skillName],
                  [levelKey]: {
                    level,
                    required,
                  },
                },
              },
              hasChanges: true,
            };
          }
          
          return {
            ...state,
            currentStates: {
              ...state.currentStates,
              [skillName]: {
                ...state.currentStates[skillName],
                [levelKey]: {
                  level,
                  required,
                },
              },
            },
            hasChanges: true,
          };
        }),
      saveChanges: () => 
        set((state) => ({
          hasChanges: false,
          originalStates: { ...state.currentStates },
        })),
      cancelChanges: () =>
        set((state) => ({
          currentStates: { ...state.originalStates },
          hasChanges: false,
        })),
      get: () => ({
        currentStates: get().currentStates,
        originalStates: get().originalStates,
      }),
    }),
    {
      name: 'competency-storage',
      skipHydration: false,
    }
  )
);