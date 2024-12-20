import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RoleSkillState {
  level: string;
  required: string;
}

interface RoleState {
  [skillName: string]: {
    [levelKey: string]: RoleSkillState;
  };
}

interface RoleSkillsState {
  roleStates: Record<string, RoleState>;
  currentStates: Record<string, RoleState>;
  originalStates: Record<string, RoleState>;
  hasChanges: boolean;
  setSkillState: (skillName: string, level: string, levelKey: string, required: string, roleId: string) => void;
  setSkillProgression: (skillName: string, progression: Record<string, RoleSkillState>, roleId: string) => void;
  resetLevels: (roleId: string) => void;
  saveChanges: (roleId: string) => void;
  cancelChanges: (roleId: string) => void;
  initializeState: (roleId: string) => void;
  getRoleState: (roleId: string) => RoleState;
}

export const useRoleSkillsStore = create<RoleSkillsState>()(
  persist(
    (set, get) => ({
      roleStates: {},
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setSkillState: (skillName, level, levelKey, required, roleId) => {
        console.log('Setting role skill state:', { skillName, level, levelKey, required, roleId });
        set((state) => {
          const newRoleStates = {
            ...state.roleStates,
            [roleId]: {
              ...state.roleStates[roleId],
              [skillName]: {
                ...state.roleStates[roleId]?.[skillName],
                [levelKey]: { level, required }
              }
            }
          };

          return {
            roleStates: newRoleStates,
            currentStates: {
              ...state.currentStates,
              [roleId]: newRoleStates[roleId]
            },
            hasChanges: true
          };
        });
      },

      setSkillProgression: (skillName, progression, roleId) => {
        console.log('Setting role skill progression:', { skillName, progression, roleId });
        set((state) => {
          const newRoleStates = {
            ...state.roleStates,
            [roleId]: {
              ...state.roleStates[roleId],
              [skillName]: progression
            }
          };

          return {
            roleStates: newRoleStates,
            currentStates: {
              ...state.currentStates,
              [roleId]: newRoleStates[roleId]
            },
            hasChanges: true
          };
        });
      },

      resetLevels: (roleId) => {
        console.log('Resetting levels for role:', roleId);
        set((state) => ({
          roleStates: {
            ...state.roleStates,
            [roleId]: {}
          },
          currentStates: {
            ...state.currentStates,
            [roleId]: {}
          },
          hasChanges: true
        }));
      },

      saveChanges: (roleId) => {
        console.log('Saving role skill changes for role:', roleId);
        set((state) => ({
          originalStates: {
            ...state.originalStates,
            [roleId]: { ...state.roleStates[roleId] }
          },
          hasChanges: false
        }));
      },

      cancelChanges: (roleId) => {
        console.log('Canceling role skill changes for role:', roleId);
        set((state) => ({
          roleStates: {
            ...state.roleStates,
            [roleId]: { ...state.originalStates[roleId] }
          },
          currentStates: {
            ...state.currentStates,
            [roleId]: { ...state.originalStates[roleId] }
          },
          hasChanges: false
        }));
      },

      initializeState: (roleId) => {
        const currentState = get().roleStates[roleId];
        if (!currentState) {
          console.log('Initializing new role state:', roleId);
          const initialState = {};
          set((state) => ({
            roleStates: {
              ...state.roleStates,
              [roleId]: initialState
            },
            currentStates: {
              ...state.currentStates,
              [roleId]: initialState
            },
            originalStates: {
              ...state.originalStates,
              [roleId]: initialState
            }
          }));
        }
      },

      getRoleState: (roleId) => {
        return get().roleStates[roleId] || {};
      }
    }),
    {
      name: 'role-skills-store',
      version: 1,
      partialize: (state) => ({
        roleStates: state.roleStates,
        currentStates: state.currentStates,
        originalStates: state.originalStates
      })
    }
  )
);