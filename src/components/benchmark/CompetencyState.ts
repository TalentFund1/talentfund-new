import { create } from 'zustand';

interface SkillState {
  level: string;
  required: string;
}

interface CompetencyState {
  currentStates: Record<string, Record<string, SkillState>>;
  setSkillState: (skillName: string, level: string, levelKey: string, required: string) => void;
}

export const useCompetencyStore = create<CompetencyState>((set) => ({
  currentStates: {},
  setSkillState: (skillName, level, levelKey, required) => {
    console.log('Setting skill state:', { skillName, level, levelKey, required });
    set((state) => ({
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
    }));
  },
}));