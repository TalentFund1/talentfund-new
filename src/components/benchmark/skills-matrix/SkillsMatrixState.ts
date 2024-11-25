import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SkillState {
  level: string;
  requirement: string;
}

interface SkillsMatrixState {
  employeeStates: Record<string, {
    originalStates: Record<string, SkillState>;
    currentStates: Record<string, SkillState>;
  }>;
  hasChanges: boolean;
  setSkillState: (employeeId: string, skillTitle: string, level: string, requirement: string) => void;
  saveChanges: (employeeId: string) => void;
  cancelChanges: (employeeId: string) => void;
  initializeState: (employeeId: string, skillTitle: string, initialLevel: string, initialRequirement: string) => void;
  duplicateEmployeeStates: (sourceEmployeeId: string, targetEmployeeId: string) => void;
}

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set, get) => ({
      employeeStates: {},
      hasChanges: false,
      initializeState: (employeeId, skillTitle, initialLevel, initialRequirement) => {
        console.log('Initializing matrix skill state:', { employeeId, skillTitle, initialLevel, initialRequirement });
        
        set((state) => {
          const employeeState = state.employeeStates[employeeId] || {
            currentStates: {},
            originalStates: {}
          };

          if (!employeeState.currentStates[skillTitle]) {
            const newEmployeeStates = {
              ...state.employeeStates,
              [employeeId]: {
                currentStates: {
                  ...employeeState.currentStates,
                  [skillTitle]: {
                    level: initialLevel || 'unspecified',
                    requirement: initialRequirement || 'required'
                  }
                },
                originalStates: {
                  ...employeeState.originalStates,
                  [skillTitle]: {
                    level: initialLevel || 'unspecified',
                    requirement: initialRequirement || 'required'
                  }
                }
              }
            };

            return {
              employeeStates: newEmployeeStates
            };
          }
          return state;
        });
      },
      setSkillState: (employeeId, skillTitle, level, requirement) => {
        console.log('Setting matrix skill state:', { employeeId, skillTitle, level, requirement });
        
        set((state) => {
          const employeeState = state.employeeStates[employeeId] || {
            currentStates: {},
            originalStates: {}
          };

          const newEmployeeStates = {
            ...state.employeeStates,
            [employeeId]: {
              ...employeeState,
              currentStates: {
                ...employeeState.currentStates,
                [skillTitle]: { level, requirement }
              }
            }
          };

          const hasChanges = JSON.stringify(newEmployeeStates[employeeId].currentStates) !== 
                            JSON.stringify(newEmployeeStates[employeeId].originalStates);

          return {
            employeeStates: newEmployeeStates,
            hasChanges
          };
        });
      },
      saveChanges: (employeeId) => {
        console.log('Saving matrix changes for employee:', employeeId);
        
        set((state) => {
          const employeeState = state.employeeStates[employeeId];
          if (!employeeState) return state;

          return {
            employeeStates: {
              ...state.employeeStates,
              [employeeId]: {
                currentStates: { ...employeeState.currentStates },
                originalStates: { ...employeeState.currentStates }
              }
            },
            hasChanges: false
          };
        });
      },
      cancelChanges: (employeeId) => {
        console.log('Cancelling matrix changes for employee:', employeeId);
        
        set((state) => {
          const employeeState = state.employeeStates[employeeId];
          if (!employeeState) return state;

          return {
            employeeStates: {
              ...state.employeeStates,
              [employeeId]: {
                currentStates: { ...employeeState.originalStates },
                originalStates: { ...employeeState.originalStates }
              }
            },
            hasChanges: false
          };
        });
      },
      duplicateEmployeeStates: (sourceEmployeeId, targetEmployeeId) => {
        console.log('Duplicating employee states:', { sourceEmployeeId, targetEmployeeId });
        
        set((state) => {
          const sourceState = state.employeeStates[sourceEmployeeId];
          if (!sourceState) {
            console.warn('Source employee state not found:', sourceEmployeeId);
            return state;
          }

          return {
            employeeStates: {
              ...state.employeeStates,
              [targetEmployeeId]: {
                currentStates: { ...sourceState.currentStates },
                originalStates: { ...sourceState.originalStates }
              }
            }
          };
        });
      }
    }),
    {
      name: 'skills-matrix-storage',
      skipHydration: false,
      partialize: (state) => ({
        employeeStates: state.employeeStates
      }),
    }
  )
);