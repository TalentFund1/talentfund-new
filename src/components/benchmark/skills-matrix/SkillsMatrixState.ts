import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SkillState {
  level: string;
  requirement: string;
}

interface SkillsMatrixState {
  states: Record<string, Record<string, SkillState>>;
  currentStates: Record<string, SkillState>;
  originalStates: Record<string, SkillState>;
  hasChanges: boolean;
  setSkillState: (employeeId: string, skillTitle: string, level: string, requirement: string) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
  initializeState: (employeeId: string, skillTitle: string, initialLevel: string, initialRequirement: string) => void;
}

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set, get) => ({
      states: {},
      currentStates: {},
      originalStates: {},
      hasChanges: false,
      initializeState: (employeeId, skillTitle, initialLevel, initialRequirement) => {
        console.log('Initializing matrix skill state:', { employeeId, skillTitle, initialLevel, initialRequirement });
        set((state) => {
          const newStates = {
            ...state.states,
            [employeeId]: {
              ...(state.states[employeeId] || {}),
              [skillTitle]: {
                level: initialLevel || 'unspecified',
                requirement: initialRequirement || 'required'
              }
            }
          };
          
          const employeeStates = newStates[employeeId] || {};
          
          return {
            states: newStates,
            currentStates: employeeStates,
            originalStates: { ...employeeStates },
            hasChanges: false
          };
        });
      },
      setSkillState: (employeeId, skillTitle, level, requirement) => {
        console.log('Setting matrix skill state:', { employeeId, skillTitle, level, requirement });
        set((state) => {
          const newStates = {
            ...state.states,
            [employeeId]: {
              ...(state.states[employeeId] || {}),
              [skillTitle]: { level, requirement }
            }
          };
          
          return {
            states: newStates,
            currentStates: newStates[employeeId] || {},
            originalStates: state.originalStates,
            hasChanges: true
          };
        });
      },
      saveChanges: () => {
        console.log('Saving matrix changes');
        set((state) => ({
          ...state,
          originalStates: { ...state.currentStates },
          hasChanges: false
        }));
      },
      cancelChanges: () => {
        console.log('Cancelling matrix changes');
        set((state) => ({
          ...state,
          currentStates: { ...state.originalStates },
          hasChanges: false
        }));
      },
    }),
    {
      name: 'skills-matrix-storage',
      partialize: (state) => ({
        states: state.states,
        currentStates: state.currentStates,
        originalStates: state.originalStates,
      }),
    }
  )
);