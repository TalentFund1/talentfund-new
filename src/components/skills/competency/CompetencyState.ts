import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompetencyStore, RoleState } from './state/types/competencyTypes';
import { roleSkills } from '../data/roleSkills';

const initializeRoleState = (roleId: string): RoleState => {
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
  if (!currentRoleSkills) return {};

  const allSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  return allSkills.reduce((acc, skill) => ({
    ...acc,
    [skill.title]: {
      level: 'unspecified',
      required: 'preferred'
    }
  }), {});
};

export const useCompetencyStore = create<CompetencyStore>()(
  persist(
    (set, get) => ({
      roleStates: {},
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setSkillState: (skillName, level, required, roleId, employeeId) => {
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

      resetLevels: (roleId, employeeId) => {
        const freshState = initializeRoleState(roleId);
        set(state => ({
          roleStates: {
            ...state.roleStates,
            [roleId]: {
              ...state.roleStates[roleId],
              [employeeId]: freshState
            }
          },
          currentStates: {
            ...state.currentStates,
            [roleId]: {
              ...state.currentStates[roleId],
              [employeeId]: freshState
            }
          },
          hasChanges: true
        }));
      },

      saveChanges: (roleId, employeeId) => {
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
          const initialState = initializeRoleState(roleId);
          set(state => ({
            roleStates: {
              ...state.roleStates,
              [roleId]: {
                ...state.roleStates[roleId],
                [employeeId]: initialState
              }
            },
            currentStates: {
              ...state.currentStates,
              [roleId]: {
                ...state.currentStates[roleId],
                [employeeId]: initialState
              }
            },
            originalStates: {
              ...state.originalStates,
              [roleId]: {
                ...state.originalStates[roleId],
                [employeeId]: initialState
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
      version: 25,
      partialize: (state) => ({
        roleStates: state.roleStates,
        currentStates: state.currentStates,
        originalStates: state.originalStates
      })
    }
  )
);