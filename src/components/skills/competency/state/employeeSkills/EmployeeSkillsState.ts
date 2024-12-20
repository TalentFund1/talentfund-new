import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RoleState, SkillState } from '../types';

interface EmployeeSkillsState {
  employeeSkills: Record<string, RoleState>;
  currentStates: Record<string, RoleState>;
  originalStates: Record<string, RoleState>;
  hasChanges: boolean;
  setSkillState: (employeeId: string, skillName: string, level: string, required: string) => void;
  setSkillProgression: (employeeId: string, skillName: string, progression: Record<string, SkillState>) => void;
  resetSkills: (employeeId: string) => void;
  saveChanges: (employeeId: string) => void;
  cancelChanges: (employeeId: string) => void;
  getEmployeeSkills: (employeeId: string) => RoleState;
}

export const useEmployeeSkillsStore = create<EmployeeSkillsState>()(
  persist(
    (set, get) => ({
      employeeSkills: {},
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setSkillState: (employeeId, skillName, level, required) => {
        console.log('Setting employee skill state:', { employeeId, skillName, level, required });
        set((state) => {
          const currentSkills = state.employeeSkills[employeeId] || {};
          const updatedSkills = {
            ...currentSkills,
            [skillName]: {
              level,
              required
            }
          };

          return {
            employeeSkills: {
              ...state.employeeSkills,
              [employeeId]: updatedSkills
            },
            currentStates: {
              ...state.currentStates,
              [employeeId]: updatedSkills
            },
            hasChanges: true
          };
        });
      },

      setSkillProgression: (employeeId, skillName, progression) => {
        console.log('Setting employee skill progression:', { employeeId, skillName, progression });
        set((state) => ({
          employeeSkills: {
            ...state.employeeSkills,
            [employeeId]: {
              ...state.employeeSkills[employeeId],
              [skillName]: progression
            }
          },
          currentStates: {
            ...state.currentStates,
            [employeeId]: {
              ...state.currentStates[employeeId],
              [skillName]: progression
            }
          },
          hasChanges: true
        }));
      },

      resetSkills: (employeeId) => {
        console.log('Resetting employee skills:', employeeId);
        set((state) => ({
          employeeSkills: {
            ...state.employeeSkills,
            [employeeId]: {}
          },
          currentStates: {
            ...state.currentStates,
            [employeeId]: {}
          },
          hasChanges: true
        }));
      },

      saveChanges: (employeeId) => {
        console.log('Saving employee changes:', employeeId);
        set((state) => ({
          originalStates: {
            ...state.originalStates,
            [employeeId]: { ...state.employeeSkills[employeeId] }
          },
          hasChanges: false
        }));
      },

      cancelChanges: (employeeId) => {
        console.log('Canceling employee changes:', employeeId);
        set((state) => ({
          employeeSkills: {
            ...state.employeeSkills,
            [employeeId]: { ...state.originalStates[employeeId] }
          },
          currentStates: {
            ...state.currentStates,
            [employeeId]: { ...state.originalStates[employeeId] }
          },
          hasChanges: false
        }));
      },

      getEmployeeSkills: (employeeId) => {
        return get().employeeSkills[employeeId] || {};
      }
    }),
    {
      name: 'employee-skills-storage',
      version: 1,
      storage: {
        getItem: (name) => {
          const value = localStorage.getItem(name);
          console.log('Loading persisted employee state:', { name, value });
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          console.log('Persisting employee state:', { name, value });
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => localStorage.removeItem(name)
      },
      partialize: (state) => ({
        employeeSkills: state.employeeSkills,
        currentStates: state.currentStates,
        originalStates: state.originalStates
      })
    }
  )
);