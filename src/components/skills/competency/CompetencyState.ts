import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompetencyState } from './state/types';
import { setSkillStateAction, setSkillProgressionAction } from './state/stateActions';
import { loadPersistedState } from './state/persistenceUtils';
import { initializeRoleState } from './state/initializeState';

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set, get) => ({
      roleStates: {},
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setSkillState: (skillName, level, levelKey, required, roleId, employeeId) => {
        console.log('Setting skill state:', { skillName, level, levelKey, required, roleId, employeeId });
        set((state) => {
          const newRoleStates = setSkillStateAction(
            state.roleStates,
            skillName,
            level,
            levelKey,
            required,
            roleId,
            employeeId
          );

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

      setSkillProgression: (skillName, progression, roleId, employeeId) => {
        console.log('Setting skill progression:', { skillName, progression, roleId, employeeId });
        set((state) => {
          const newRoleStates = setSkillProgressionAction(
            state.roleStates,
            skillName,
            progression,
            roleId,
            employeeId
          );

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

      resetLevels: (roleId, employeeId) => {
        console.log('Resetting levels for role and employee:', { roleId, employeeId });
        set((state) => {
          const freshState = initializeRoleState(roleId);
          return {
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
          };
        });
      },

      saveChanges: (roleId) => {
        console.log('Saving changes for role:', roleId);
        set((state) => ({
          originalStates: {
            ...state.originalStates,
            [roleId]: { ...state.roleStates[roleId] }
          },
          hasChanges: false
        }));
      },

      cancelChanges: (roleId) => {
        console.log('Canceling changes for role:', roleId);
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

      initializeState: (roleId, employeeId) => {
        const currentState = get().roleStates[roleId]?.[employeeId];
        if (!currentState) {
          console.log('Initializing state for role and employee:', { roleId, employeeId });
          const savedState = loadPersistedState(roleId, employeeId);
          
          if (savedState) {
            console.log('Loaded saved state for role and employee:', { roleId, employeeId });
            set((state) => ({
              roleStates: {
                ...state.roleStates,
                [roleId]: {
                  ...state.roleStates[roleId],
                  [employeeId]: savedState
                }
              },
              currentStates: {
                ...state.currentStates,
                [roleId]: {
                  ...state.currentStates[roleId],
                  [employeeId]: savedState
                }
              },
              originalStates: {
                ...state.originalStates,
                [roleId]: {
                  ...state.originalStates[roleId],
                  [employeeId]: savedState
                }
              }
            }));
          } else {
            console.log('Creating new state for role and employee:', { roleId, employeeId });
            const initialState = initializeRoleState(roleId);
            set((state) => ({
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
        }
      },

      getRoleState: (roleId, employeeId) => {
        return get().roleStates[roleId]?.[employeeId] || {};
      }
    }),
    {
      name: 'competency-storage',
      version: 26, // Increment version to ensure clean state
      partialize: (state) => ({
        roleStates: state.roleStates,
        currentStates: state.currentStates,
        originalStates: state.originalStates
      })
    }
  )
);