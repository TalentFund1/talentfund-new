import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmployeeSkillState, EmployeeSkillRequirement } from '../../../types/skillTypes';

interface SkillsMatrixState {
  skillStates: {
    [employeeId: string]: {
      [skillId: string]: EmployeeSkillState;
    };
  };
  currentStates: {
    [employeeId: string]: {
      [skillId: string]: EmployeeSkillState;
    };
  };
  hasChanges: boolean;
  setSkillState: (employeeId: string, skillId: string, level: string, requirement: EmployeeSkillRequirement) => void;
  initializeState: (employeeId: string, skillId: string, initialLevel: string, initialRequirement: EmployeeSkillRequirement) => void;
  getSkillState: (employeeId: string, skillId: string) => EmployeeSkillState | undefined;
  saveChanges: () => void;
  cancelChanges: () => void;
}

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set, get) => ({
      skillStates: {},
      currentStates: {},
      hasChanges: false,

      setSkillState: (employeeId, skillId, level, requirement) => {
        console.log('Setting skill state:', { employeeId, skillId, level, requirement });
        
        set((state) => {
          // Create deep copies to avoid reference issues
          const updatedSkillStates = {
            ...state.skillStates,
            [employeeId]: {
              ...state.skillStates[employeeId],
              [skillId]: {
                employeeId,
                skillId,
                level,
                requirement
              }
            }
          };

          return {
            skillStates: updatedSkillStates,
            currentStates: {
              ...state.currentStates,
              [employeeId]: {
                ...state.currentStates[employeeId],
                [skillId]: {
                  employeeId,
                  skillId,
                  level,
                  requirement
                }
              }
            },
            hasChanges: true
          };
        });
      },

      initializeState: (employeeId, skillId, initialLevel, initialRequirement) => {
        const state = get();
        if (!state.skillStates[employeeId]?.[skillId]) {
          console.log('Initializing skill state:', { 
            employeeId, 
            skillId, 
            initialLevel, 
            initialRequirement 
          });
          
          set((state) => ({
            skillStates: {
              ...state.skillStates,
              [employeeId]: {
                ...state.skillStates[employeeId],
                [skillId]: {
                  employeeId,
                  skillId,
                  level: initialLevel,
                  requirement: initialRequirement
                }
              }
            },
            currentStates: {
              ...state.currentStates,
              [employeeId]: {
                ...state.currentStates[employeeId],
                [skillId]: {
                  employeeId,
                  skillId,
                  level: initialLevel,
                  requirement: initialRequirement
                }
              }
            }
          }));
        }
      },

      getSkillState: (employeeId, skillId) => {
        const state = get().skillStates[employeeId]?.[skillId];
        console.log('Getting skill state:', { employeeId, skillId, state });
        return state;
      },

      saveChanges: () => {
        console.log('Saving skill matrix changes');
        set((state) => ({
          currentStates: JSON.parse(JSON.stringify(state.skillStates)), // Deep clone to break references
          hasChanges: false
        }));
      },

      cancelChanges: () => {
        console.log('Canceling skill matrix changes');
        set((state) => ({
          skillStates: JSON.parse(JSON.stringify(state.currentStates)), // Deep clone to break references
          hasChanges: false
        }));
      }
    }),
    {
      name: 'skills-matrix-storage',
      version: 7, // Increment version to ensure clean state
      partialize: (state) => ({
        skillStates: state.skillStates,
        currentStates: state.currentStates
      }),
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          console.log('Loading persisted state:', { name, value: str ? JSON.parse(str) : null });
          return str ? Promise.resolve(JSON.parse(str)) : Promise.resolve(null);
        },
        setItem: (name, value) => {
          console.log('Persisting state:', { name, value });
          localStorage.setItem(name, JSON.stringify(value));
          return Promise.resolve();
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
          return Promise.resolve();
        },
      }
    }
  )
);