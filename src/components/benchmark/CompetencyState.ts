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
    set((state) => {
      // Initialize the skill state if it doesn't exist
      if (!state.currentStates[skillName]) {
        state.currentStates[skillName] = {};
      }
      
      // Initialize all levels for this skill if they don't exist
      ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'm3', 'm4', 'm5', 'm6'].forEach(level => {
        if (!state.currentStates[skillName][level]) {
          state.currentStates[skillName][level] = {
            level: 'unspecified',
            required: 'preferred'
          };
        }
      });

      return {
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
      };
    });
  },
}));