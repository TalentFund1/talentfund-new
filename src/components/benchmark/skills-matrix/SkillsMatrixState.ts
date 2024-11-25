import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SkillState {
  level: string;
  requirement: string;
}

interface EmployeeState {
  currentStates: Record<string, SkillState>;
  originalStates: Record<string, SkillState>;
}

interface SkillsMatrixState {
  employeeStates: Record<string, EmployeeState>;
  currentStates: Record<string, SkillState>;
  originalStates: Record<string, SkillState>;
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
      currentStates: {},
      originalStates: {},
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
              employeeStates: newEmployeeStates,
              currentStates: newEmployeeStates[employeeId].currentStates,
              originalStates: newEmployeeStates[employeeId].originalStates,
              hasChanges: false
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
            currentStates: newEmployeeStates[employeeId].currentStates,
            originalStates: newEmployeeStates[employeeId].originalStates,
            hasChanges
          };
        });
      },
      saveChanges: (employeeId) => {
        console.log('Saving matrix changes for employee:', employeeId);
        
        set((state) => {
          const employeeState = state.employeeStates[employeeId];
          if (!employeeState) return state;

          const newEmployeeStates = {
            ...state.employeeStates,
            [employeeId]: {
              currentStates: { ...employeeState.currentStates },
              originalStates: { ...employeeState.currentStates }
            }
          };

          return {
            employeeStates: newEmployeeStates,
            currentStates: newEmployeeStates[employeeId].currentStates,
            originalStates: newEmployeeStates[employeeId].originalStates,
            hasChanges: false
          };
        });
      },
      cancelChanges: (employeeId) => {
        console.log('Cancelling matrix changes for employee:', employeeId);
        
        set((state) => {
          const employeeState = state.employeeStates[employeeId];
          if (!employeeState) return state;

          const newEmployeeStates = {
            ...state.employeeStates,
            [employeeId]: {
              currentStates: { ...employeeState.originalStates },
              originalStates: { ...employeeState.originalStates }
            }
          };

          return {
            employeeStates: newEmployeeStates,
            currentStates: newEmployeeStates[employeeId].currentStates,
            originalStates: newEmployeeStates[employeeId].originalStates,
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

          const newEmployeeStates = {
            ...state.employeeStates,
            [targetEmployeeId]: {
              currentStates: { ...sourceState.currentStates },
              originalStates: { ...sourceState.originalStates }
            }
          };

          return {
            employeeStates: newEmployeeStates,
            currentStates: newEmployeeStates[targetEmployeeId].currentStates,
            originalStates: newEmployeeStates[targetEmployeeId].originalStates,
            hasChanges: false
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