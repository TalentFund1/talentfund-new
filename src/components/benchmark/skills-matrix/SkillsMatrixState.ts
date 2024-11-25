import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SkillState {
  level: string;
  requirement: string;
}

interface SkillsMatrixState {
  originalStates: Record<string, Record<string, SkillState>>;
  currentStates: Record<string, Record<string, SkillState>>;
  hasChanges: boolean;
  setSkillState: (skillTitle: string, level: string, requirement: string) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
  initializeState: (skillTitle: string, initialLevel: string, initialRequirement: string, employeeId: string) => void;
  cleanupState: (employeeId: string) => void;
  duplicateState: (sourceEmployeeId: string, targetEmployeeId: string) => void;
}

const getStorageKey = (employeeId: string) => `skills-matrix-${employeeId}`;

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set, get) => ({
      originalStates: {},
      currentStates: {},
      hasChanges: false,
      initializeState: (skillTitle, initialLevel, initialRequirement, employeeId) => {
        console.log('Initializing matrix skill state:', { skillTitle, initialLevel, initialRequirement, employeeId });
        
        const storageKey = getStorageKey(employeeId);
        const savedState = localStorage.getItem(storageKey);
        
        if (savedState) {
          try {
            const parsed = JSON.parse(savedState);
            if (parsed && typeof parsed === 'object') {
              set((state) => ({
                currentStates: {
                  ...state.currentStates,
                  [employeeId]: {
                    ...parsed,
                    [skillTitle]: {
                      level: initialLevel || 'unspecified',
                      requirement: initialRequirement || 'required'
                    }
                  }
                },
                originalStates: {
                  ...state.originalStates,
                  [employeeId]: {
                    ...parsed,
                    [skillTitle]: {
                      level: initialLevel || 'unspecified',
                      requirement: initialRequirement || 'required'
                    }
                  }
                }
              }));
              return;
            }
          } catch (error) {
            console.error('Error parsing saved state:', error);
          }
        }

        set((state) => ({
          currentStates: {
            ...state.currentStates,
            [employeeId]: {
              ...(state.currentStates[employeeId] || {}),
              [skillTitle]: {
                level: initialLevel || 'unspecified',
                requirement: initialRequirement || 'required'
              }
            }
          },
          originalStates: {
            ...state.originalStates,
            [employeeId]: {
              ...(state.originalStates[employeeId] || {}),
              [skillTitle]: {
                level: initialLevel || 'unspecified',
                requirement: initialRequirement || 'required'
              }
            }
          }
        }));
      },
      setSkillState: (skillTitle, level, requirement) => {
        console.log('Setting matrix skill state:', { skillTitle, level, requirement });
        set((state) => {
          const newStates = {
            ...state.currentStates,
            [skillTitle]: { level, requirement }
          };
          
          const hasChanges = JSON.stringify(newStates) !== JSON.stringify(state.originalStates);
          
          return { 
            currentStates: newStates,
            hasChanges
          };
        });
      },
      saveChanges: () => {
        console.log('Saving matrix changes');
        set((state) => ({
          originalStates: { ...state.currentStates },
          hasChanges: false,
        }));
      },
      cancelChanges: () => {
        console.log('Cancelling matrix changes');
        set((state) => ({
          currentStates: { ...state.originalStates },
          hasChanges: false,
        }));
      },
      cleanupState: (employeeId) => {
        console.log('Cleaning up state for employee:', employeeId);
        set((state) => {
          const { [employeeId]: _, ...remainingCurrentStates } = state.currentStates;
          const { [employeeId]: __, ...remainingOriginalStates } = state.originalStates;
          
          return {
            currentStates: remainingCurrentStates,
            originalStates: remainingOriginalStates,
            hasChanges: false
          };
        });
      },
      duplicateState: (sourceEmployeeId, targetEmployeeId) => {
        console.log('Duplicating state:', { from: sourceEmployeeId, to: targetEmployeeId });
        set((state) => {
          const sourceState = state.currentStates[sourceEmployeeId] || {};
          
          return {
            currentStates: {
              ...state.currentStates,
              [targetEmployeeId]: { ...sourceState }
            },
            originalStates: {
              ...state.originalStates,
              [targetEmployeeId]: { ...sourceState }
            }
          };
        });
      }
    }),
    {
      name: 'skills-matrix-storage',
      skipHydration: false,
      partialize: (state) => ({
        originalStates: state.originalStates,
        currentStates: state.currentStates,
      }),
    }
  )
);