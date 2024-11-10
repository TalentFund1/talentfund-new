import { create } from 'zustand';

interface SkillState {
  level: string;
  required: string;
}

interface CompetencyState {
  skillStates: Record<string, Record<string, SkillState>>;
  savedStates: Record<string, Record<string, SkillState>>;
  hasChanges: boolean;
  setSkillState: (skillName: string, level: string, newState: SkillState) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
}

export const useCompetencyState = create<CompetencyState>((set) => ({
  skillStates: {},
  savedStates: {},
  hasChanges: false,
  setSkillState: (skillName, level, newState) =>
    set((state) => ({
      skillStates: {
        ...state.skillStates,
        [skillName]: {
          ...(state.skillStates[skillName] || {}),
          [level]: newState,
        },
      },
      hasChanges: true,
    })),
  saveChanges: () =>
    set((state) => ({
      savedStates: state.skillStates,
      hasChanges: false,
    })),
  cancelChanges: () =>
    set((state) => ({
      skillStates: state.savedStates,
      hasChanges: false,
    })),
}));