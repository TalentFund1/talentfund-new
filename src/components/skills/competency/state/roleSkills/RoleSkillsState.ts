import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RoleState, SkillState } from '../types';
import { loadPersistedState } from '../persistenceUtils';
import { initializeRoleState } from '../initializeState';

interface RoleSkillsState {
  roleStates: Record<string, RoleState>;
  currentStates: Record<string, RoleState>;
  originalStates: Record<string, RoleState>;
  hasChanges: boolean;
  setSkillState: (skillName: string, level: string, levelKey: string, required: string, roleId: string) => void;
  setSkillProgression: (skillName: string, progression: Record<string, SkillState>, roleId: string) => void;
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
          const currentRoleState = state.roleStates[roleId] || {};
          const updatedRoleState = {
            ...currentRoleState,
            [skillName]: {
              ...(currentRoleState[skillName] || {}),
              [levelKey]: { level, required }
            }
          };

          return {
            roleStates: {
              ...state.roleStates,
              [roleId]: updatedRoleState
            },
            currentStates: {
              ...state.currentStates,
              [roleId]: updatedRoleState
            },
            hasChanges: true
          };
        });
      },

      setSkillProgression: (skillName, progression, roleId) => {
        console.log('Setting role skill progression:', { skillName, progression, roleId });
        set((state) => ({
          roleStates: {
            ...state.roleStates,
            [roleId]: {
              ...state.roleStates[roleId],
              [skillName]: progression
            }
          },
          currentStates: {
            ...state.currentStates,
            [roleId]: {
              ...state.currentStates[roleId],
              [skillName]: progression
            }
          },
          hasChanges: true
        }));
      },

      resetLevels: (roleId) => {
        console.log('Resetting role levels:', roleId);
        const freshState = initializeRoleState(roleId);
        set((state) => ({
          roleStates: {
            ...state.roleStates,
            [roleId]: freshState
          },
          currentStates: {
            ...state.currentStates,
            [roleId]: freshState
          },
          hasChanges: true
        }));
      },

      saveChanges: (roleId) => {
        console.log('Saving role changes:', roleId);
        set((state) => ({
          originalStates: {
            ...state.originalStates,
            [roleId]: { ...state.roleStates[roleId] }
          },
          hasChanges: false
        }));
      },

      cancelChanges: (roleId) => {
        console.log('Canceling role changes:', roleId);
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
          console.log('Initializing role state:', roleId);
          const savedState = loadPersistedState(roleId);
          
          if (savedState) {
            console.log('Loaded saved role state:', roleId);
            set((state) => ({
              roleStates: {
                ...state.roleStates,
                [roleId]: savedState
              },
              currentStates: {
                ...state.currentStates,
                [roleId]: savedState
              },
              originalStates: {
                ...state.originalStates,
                [roleId]: savedState
              }
            }));
          } else {
            console.log('Creating new role state:', roleId);
            const initialState = initializeRoleState(roleId);
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
        }
      },

      getRoleState: (roleId) => {
        return get().roleStates[roleId] || {};
      }
    }),
    {
      name: 'role-skills-storage',
      version: 1,
      storage: {
        getItem: (name) => {
          const value = localStorage.getItem(name);
          console.log('Loading persisted role state:', { name, value });
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          console.log('Persisting role state:', { name, value });
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => localStorage.removeItem(name)
      },
      partialize: (state) => ({
        roleStates: state.roleStates,
        currentStates: state.currentStates,
        originalStates: state.originalStates
      })
    }
  )
);