import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmployeeSkillState, EmployeeSkillRequirement, SkillsMatrixState } from '../../../types/skillTypes';

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set, get) => ({
      skillStates: {},
      currentStates: {},
      hasChanges: false,

      setSkillState: (employeeId, skillId, level, requirement) => {
        console.log('Setting skill state:', { employeeId, skillId, level, requirement });
        
        set((state) => {
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
            currentStates: updatedSkillStates,
            hasChanges: true
          };
        });
      },

      initializeState: (employeeId, skillId, initialLevel, initialRequirement) => {
        const state = get();
        if (!state.skillStates[employeeId]?.[skillId]) {
          console.log('Initializing skill state:', { employeeId, skillId, initialLevel, initialRequirement });
          
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
          currentStates: state.skillStates,
          hasChanges: false
        }));
      },

      cancelChanges: () => {
        console.log('Canceling skill matrix changes');
        set((state) => ({
          skillStates: state.currentStates,
          hasChanges: false
        }));
      }
    }),
    {
      name: 'skills-matrix-storage',
      version: 4,
      partialize: (state) => ({
        skillStates: state.skillStates,
        currentStates: state.currentStates
      })
    }
  )
);