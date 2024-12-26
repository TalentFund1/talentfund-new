import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EmployeeSkillData, EmployeeSkillsState } from '../types/employeeSkillTypes';

interface EmployeeSkillsStore {
  skillStates: Record<string, EmployeeSkillsState>;
  getSkillState: (employeeId: string, skillTitle: string) => EmployeeSkillData;
  getEmployeeSkills: (employeeId: string) => EmployeeSkillsState;
  setSkillLevel: (employeeId: string, skillTitle: string, level: string) => void;
  setSkillGoalStatus: (employeeId: string, skillTitle: string, status: boolean) => void;
  initializeEmployeeSkills: (employeeId: string) => void;
  resetSkillStates: () => void;
}

export const useEmployeeSkillsStore = create<EmployeeSkillsStore>()(
  persist(
    (set, get) => ({
      skillStates: {},
      
      getSkillState: (employeeId, skillTitle) => {
        const employeeSkills = get().skillStates[employeeId];
        return employeeSkills?.[skillTitle] || { level: '', goalStatus: false };
      },

      getEmployeeSkills: (employeeId) => {
        return get().skillStates[employeeId] || {};
      },

      setSkillLevel: (employeeId, skillTitle, level) => {
        set((state) => ({
          skillStates: {
            ...state.skillStates,
            [employeeId]: {
              ...state.skillStates[employeeId],
              [skillTitle]: {
                ...state.skillStates[employeeId]?.[skillTitle],
                level
              }
            }
          }
        }));
      },

      setSkillGoalStatus: (employeeId, skillTitle, status) => {
        set((state) => ({
          skillStates: {
            ...state.skillStates,
            [employeeId]: {
              ...state.skillStates[employeeId],
              [skillTitle]: {
                ...state.skillStates[employeeId]?.[skillTitle],
                goalStatus: status
              }
            }
          }
        }));
      },

      initializeEmployeeSkills: (employeeId) => {
        set((state) => {
          if (!state.skillStates[employeeId]) {
            return {
              skillStates: {
                ...state.skillStates,
                [employeeId]: {}
              }
            };
          }
          return state;
        });
      },

      resetSkillStates: () => {
        set({ skillStates: {} });
      }
    }),
    {
      name: 'employee-skills-storage',
      version: 1
    }
  )
);