import { create } from "zustand";
import { persist } from 'zustand/middleware';
import { SkillLevel, SkillRequirement, EmployeeState } from '../../skills/types/SkillTypes';

interface SkillsMatrixState {
  currentStates: { [employeeId: string]: EmployeeState };
  originalStates: { [employeeId: string]: EmployeeState };
  hasChanges: boolean;
  setSkillState: (employeeId: string, skillTitle: string, level: SkillLevel, requirement: SkillRequirement) => void;
  resetSkills: (employeeId: string) => void;
  initializeState: (employeeId: string, level: SkillLevel, requirement: SkillRequirement) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
}

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set) => ({
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setSkillState: (employeeId, skillTitle, level, requirement) =>
        set((state) => {
          console.log('Setting skill state:', { employeeId, skillTitle, level, requirement });
          
          return {
            currentStates: {
              ...state.currentStates,
              [employeeId]: {
                ...state.currentStates[employeeId],
                [skillTitle]: { level, required: requirement },
              },
            },
            hasChanges: true,
          };
        }),

      resetSkills: (employeeId) =>
        set((state) => {
          console.log('Resetting skills for employee:', employeeId);
          
          return {
            currentStates: {
              ...state.currentStates,
              [employeeId]: {}
            },
            hasChanges: true,
          };
        }),

      initializeState: (employeeId, level, requirement) =>
        set((state) => {
          if (!state.currentStates[employeeId]) {
            console.log('Initializing state for employee:', employeeId);
            
            return {
              currentStates: {
                ...state.currentStates,
                [employeeId]: {}
              },
              originalStates: {
                ...state.originalStates,
                [employeeId]: {}
              }
            };
          }
          return state;
        }),

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
    }),
    {
      name: 'skills-matrix-storage',
      version: 1,
      partialize: (state) => ({
        currentStates: state.currentStates,
        originalStates: state.originalStates
      }),
    }
  )
);