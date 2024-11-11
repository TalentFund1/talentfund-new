import { create } from 'zustand';

interface SkillState {
  level: string;
  requirement: string;
}

interface SkillsMatrixState {
  originalStates: Record<string, SkillState>;
  currentStates: Record<string, SkillState>;
  currentRole: string;
  hasChanges: boolean;
  setSkillState: (skillTitle: string, level: string, requirement: string) => void;
  setCurrentRole: (role: string) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
}

export const useSkillsMatrixStore = create<SkillsMatrixState>((set) => ({
  originalStates: {},
  currentStates: {},
  currentRole: '',
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
  setCurrentRole: (role) => set({ currentRole: role }),
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
}));