import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SkillState {
  level: string;
  requirement: string;
}

interface SkillsMatrixState {
  states: Record<string, Record<string, SkillState>>;
  hasChanges: boolean;
  setSkillState: (employeeId: string, skillTitle: string, level: string, requirement: string) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
  initializeState: (employeeId: string, skillTitle: string, initialLevel: string, initialRequirement: string) => void;
}

const getStorageKey = (employeeId: string) => `skills-matrix-${employeeId}`;

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set, get) => ({
      states: {},
      hasChanges: false,
      initializeState: (employeeId, skillTitle, initialLevel, initialRequirement) => {
        console.log('Initializing matrix skill state:', { employeeId, skillTitle, initialLevel, initialRequirement });
        set((state) => ({
          states: {
            ...state.states,
            [employeeId]: {
              ...(state.states[employeeId] || {}),
              [skillTitle]: {
                level: initialLevel || 'unspecified',
                requirement: initialRequirement || 'required'
              }
            }
          }
        }));
      },
      setSkillState: (employeeId, skillTitle, level, requirement) => {
        console.log('Setting matrix skill state:', { employeeId, skillTitle, level, requirement });
        set((state) => ({
          states: {
            ...state.states,
            [employeeId]: {
              ...(state.states[employeeId] || {}),
              [skillTitle]: { level, requirement }
            }
          },
          hasChanges: true
        }));
      },
      saveChanges: () => {
        console.log('Saving matrix changes');
        set({ hasChanges: false });
      },
      cancelChanges: () => {
        console.log('Cancelling matrix changes');
        const currentStates = get().states;
        set((state) => ({
          states: { ...currentStates },
          hasChanges: false
        }));
      },
    }),
    {
      name: 'skills-matrix-storage',
      partialize: (state) => ({
        states: state.states,
      }),
    }
  )
);