import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RoleSkillState {
  level: string;
  requirement: string;
}

interface RoleSkillsMatrixState {
  roleStates: { [roleId: string]: { [skillTitle: string]: RoleSkillState } };
  currentStates: { [roleId: string]: { [skillTitle: string]: RoleSkillState } };
  originalStates: { [roleId: string]: { [skillTitle: string]: RoleSkillState } };
  hasChanges: boolean;
  setSkillState: (roleId: string, skillTitle: string, level: string, requirement: string) => void;
  resetSkills: (roleId: string) => void;
  initializeState: (roleId: string, skillTitle: string, level: string, requirement: string) => void;
  saveChanges: (roleId: string) => void;
  cancelChanges: (roleId: string) => void;
}

export const useRoleSkillsStore = create<RoleSkillsMatrixState>()(
  persist(
    (set) => ({
      roleStates: {},
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setSkillState: (roleId, skillTitle, level, requirement) => {
        console.log('Setting role skill state:', { roleId, skillTitle, level, requirement });
        set((state) => ({
          roleStates: {
            ...state.roleStates,
            [roleId]: {
              ...state.roleStates[roleId],
              [skillTitle]: { level, requirement },
            },
          },
          currentStates: {
            ...state.currentStates,
            [roleId]: {
              ...state.currentStates[roleId],
              [skillTitle]: { level, requirement },
            },
          },
          hasChanges: true,
        }));
      },

      resetSkills: (roleId) => {
        console.log('Resetting role skills for:', roleId);
        set((state) => ({
          roleStates: {
            ...state.roleStates,
            [roleId]: {},
          },
          currentStates: {
            ...state.currentStates,
            [roleId]: {},
          },
          hasChanges: false,
        }));
      },

      initializeState: (roleId, skillTitle, level, requirement) => {
        console.log('Initializing role skill state:', { roleId, skillTitle, level, requirement });
        set((state) => {
          if (!state.roleStates[roleId]?.[skillTitle]) {
            return {
              roleStates: {
                ...state.roleStates,
                [roleId]: {
                  ...state.roleStates[roleId],
                  [skillTitle]: { level, requirement },
                },
              },
              currentStates: {
                ...state.currentStates,
                [roleId]: {
                  ...state.currentStates[roleId],
                  [skillTitle]: { level, requirement },
                },
              },
              originalStates: {
                ...state.originalStates,
                [roleId]: {
                  ...state.originalStates[roleId],
                  [skillTitle]: { level, requirement },
                },
              },
            };
          }
          return state;
        });
      },

      saveChanges: (roleId) => {
        console.log('Saving role skill changes for:', roleId);
        set((state) => ({
          originalStates: {
            ...state.originalStates,
            [roleId]: { ...state.roleStates[roleId] },
          },
          hasChanges: false,
        }));
      },

      cancelChanges: (roleId) => {
        console.log('Canceling role skill changes for:', roleId);
        set((state) => ({
          roleStates: {
            ...state.roleStates,
            [roleId]: { ...state.originalStates[roleId] },
          },
          currentStates: {
            ...state.currentStates,
            [roleId]: { ...state.originalStates[roleId] },
          },
          hasChanges: false,
        }));
      },
    }),
    {
      name: 'role-skills-matrix',
      version: 1,
      partialize: (state) => ({
        roleStates: state.roleStates,
        currentStates: state.currentStates,
        originalStates: state.originalStates,
      }),
    }
  )
);