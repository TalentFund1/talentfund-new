import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SkillState {
  level: string;
  required: string;
}

interface RoleState {
  [skillName: string]: {
    level: string;
    required: string;
  };
}

interface EmployeeState {
  [employeeId: string]: RoleState;
}

interface CompetencyState {
  roleStates: Record<string, EmployeeState>;
  currentStates: Record<string, EmployeeState>;
  originalStates: Record<string, EmployeeState>;
  hasChanges: boolean;
  setSkillState: (skillName: string, level: string, levelKey: string, required: string, roleId: string, employeeId: string) => void;
  setSkillProgression: (skillName: string, progression: Record<string, SkillState>, roleId: string, employeeId: string) => void;
  resetLevels: (roleId: string, employeeId: string) => void;
  saveChanges: (roleId: string, employeeId: string) => void;
  cancelChanges: (roleId: string, employeeId: string) => void;
  initializeState: (roleId: string, employeeId: string) => void;
  getRoleState: (roleId: string, employeeId: string) => RoleState;
}

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set, get) => ({
      roleStates: {},
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setSkillState: (skillName, level, levelKey, required, roleId, employeeId) => {
        console.log('Setting skill state:', { skillName, level, levelKey, required, roleId, employeeId });
        set(state => {
          const newState = {
            roleStates: {
              ...state.roleStates,
              [roleId]: {
                ...state.roleStates[roleId],
                [employeeId]: {
                  ...state.roleStates[roleId]?.[employeeId],
                  [skillName]: { level, required }
                }
              }
            },
            currentStates: {
              ...state.currentStates,
              [roleId]: {
                ...state.currentStates[roleId],
                [employeeId]: {
                  ...state.currentStates[roleId]?.[employeeId],
                  [skillName]: { level, required }
                }
              }
            },
            hasChanges: true
          };
          return newState;
        });
      },

      setSkillProgression: (skillName, progression, roleId, employeeId) => {
        console.log('Setting skill progression:', { skillName, progression, roleId, employeeId });
        set(state => ({
          roleStates: {
            ...state.roleStates,
            [roleId]: {
              ...state.roleStates[roleId],
              [employeeId]: {
                ...state.roleStates[roleId]?.[employeeId],
                [skillName]: progression
              }
            }
          },
          currentStates: {
            ...state.currentStates,
            [roleId]: {
              ...state.currentStates[roleId],
              [employeeId]: {
                ...state.currentStates[roleId]?.[employeeId],
                [skillName]: progression
              }
            }
          },
          hasChanges: true
        }));
      },

      resetLevels: (roleId, employeeId) => {
        console.log('Resetting levels for role and employee:', { roleId, employeeId });
        set(state => ({
          roleStates: {
            ...state.roleStates,
            [roleId]: {
              ...state.roleStates[roleId],
              [employeeId]: {}
            }
          },
          currentStates: {
            ...state.currentStates,
            [roleId]: {
              ...state.currentStates[roleId],
              [employeeId]: {}
            }
          },
          hasChanges: true
        }));
      },

      saveChanges: (roleId, employeeId) => {
        console.log('Saving changes for role and employee:', { roleId, employeeId });
        set(state => ({
          originalStates: {
            ...state.originalStates,
            [roleId]: {
              ...state.originalStates[roleId],
              [employeeId]: state.roleStates[roleId]?.[employeeId] || {}
            }
          },
          hasChanges: false
        }));
      },

      cancelChanges: (roleId, employeeId) => {
        console.log('Canceling changes for role and employee:', { roleId, employeeId });
        set(state => ({
          roleStates: {
            ...state.roleStates,
            [roleId]: {
              ...state.roleStates[roleId],
              [employeeId]: state.originalStates[roleId]?.[employeeId] || {}
            }
          },
          currentStates: {
            ...state.currentStates,
            [roleId]: {
              ...state.currentStates[roleId],
              [employeeId]: state.originalStates[roleId]?.[employeeId] || {}
            }
          },
          hasChanges: false
        }));
      },

      initializeState: (roleId, employeeId) => {
        const currentState = get().roleStates[roleId]?.[employeeId];
        if (!currentState) {
          console.log('Initializing state for role and employee:', { roleId, employeeId });
          set(state => ({
            roleStates: {
              ...state.roleStates,
              [roleId]: {
                ...state.roleStates[roleId],
                [employeeId]: {}
              }
            },
            currentStates: {
              ...state.currentStates,
              [roleId]: {
                ...state.currentStates[roleId],
                [employeeId]: {}
              }
            },
            originalStates: {
              ...state.originalStates,
              [roleId]: {
                ...state.originalStates[roleId],
                [employeeId]: {}
              }
            }
          }));
        }
      },

      getRoleState: (roleId, employeeId) => {
        return get().roleStates[roleId]?.[employeeId] || {};
      }
    }),
    {
      name: 'competency-storage',
      version: 24,
      partialize: (state) => ({
        roleStates: state.roleStates,
        currentStates: state.currentStates,
        originalStates: state.originalStates
      })
    }
  )
);