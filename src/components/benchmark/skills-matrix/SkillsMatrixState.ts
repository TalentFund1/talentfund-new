import { create } from "zustand";
import { EmployeeSkillState, SkillState } from './skillStateTypes';

interface SkillsMatrixState {
  currentStates: { [employeeId: string]: EmployeeSkillState };
  originalStates: { [employeeId: string]: EmployeeSkillState };
  hasChanges: boolean;
  setSkillState: (employeeId: string, skillTitle: string, level: string, requirement: string) => void;
  resetSkills: (employeeId: string) => void;
  initializeState: (employeeId: string, level: string, requirement: string) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
}

export const useSkillsMatrixStore = create<SkillsMatrixState>((set) => ({
  currentStates: {},
  originalStates: {},
  hasChanges: false,

  setSkillState: (employeeId, skillTitle, level, requirement) =>
    set((state) => {
      console.log('Setting skill state:', { employeeId, skillTitle, level, requirement });
      
      const newState = {
        currentStates: {
          ...state.currentStates,
          [employeeId]: {
            ...state.currentStates[employeeId],
            [skillTitle]: { level, requirement },
          },
        },
        hasChanges: true,
      };

      console.log('Updated state:', newState);
      return newState;
    }),

  resetSkills: (employeeId) =>
    set((state) => {
      console.log('Resetting skills for employee:', employeeId);
      
      const resetState: EmployeeSkillState = {};
      
      return {
        currentStates: {
          ...state.currentStates,
          [employeeId]: resetState
        },
        hasChanges: true,
      };
    }),

  initializeState: (employeeId, level, requirement) =>
    set((state) => {
      if (!state.currentStates[employeeId]) {
        console.log('Initializing state for employee:', employeeId);
        
        const initialState: EmployeeSkillState = {};

        return {
          currentStates: {
            ...state.currentStates,
            [employeeId]: initialState
          },
          originalStates: {
            ...state.originalStates,
            [employeeId]: initialState
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
}));
