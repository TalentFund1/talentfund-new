import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SkillsMatrixState, EmployeeSkillState } from './skillStateTypes';

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set) => ({
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setSkillState: (employeeId, skillTitle, level, requirement) => {
        console.log('Setting skill state:', { employeeId, skillTitle, level, requirement });
        
        set((state) => ({
          currentStates: {
            ...state.currentStates,
            [employeeId]: {
              ...state.currentStates[employeeId],
              [skillTitle]: { level, requirement }
            }
          },
          hasChanges: true
        }));
      },

      saveChanges: (employeeId) => {
        set((state) => ({
          originalStates: {
            ...state.originalStates,
            [employeeId]: {
              ...state.currentStates[employeeId]
            }
          },
          hasChanges: false
        }));
      },

      cancelChanges: (employeeId) => {
        set((state) => ({
          currentStates: {
            ...state.currentStates,
            [employeeId]: {
              ...state.originalStates[employeeId]
            }
          },
          hasChanges: false
        }));
      },

      resetSkills: (employeeId) => {
        set((state) => ({
          currentStates: {
            ...state.currentStates,
            [employeeId]: {}
          },
          hasChanges: true
        }));
      }
    }),
    {
      name: 'skills-matrix-storage',
      version: 1,
      partialize: (state) => ({
        currentStates: state.currentStates,
        originalStates: state.originalStates
      })
    }
  )
);