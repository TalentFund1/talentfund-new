import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompetencyState, RoleState, EmployeeSkillState } from './types';
import { loadPersistedState, persistState } from './persistenceUtils';
import { initializeRoleState } from './initializeState';

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set, get) => ({
      roleStates: {},
      currentStates: {},
      originalStates: {},
      employeeStates: {},
      hasChanges: false,

      setSkillState: (skillName, level, levelKey, required, roleId, employeeId) => {
        console.log('Setting skill state:', { skillName, level, levelKey, required, roleId, employeeId });
        set((state) => {
          const newState = { ...state };

          // Update employee-specific state if employeeId is provided
          if (employeeId) {
            newState.employeeStates = {
              ...state.employeeStates,
              [employeeId]: {
                ...state.employeeStates[employeeId],
                [skillName]: {
                  level,
                  required
                }
              }
            };
          }

          // Update role-based state
          const currentRoleState = state.roleStates[roleId] || {};
          const updatedRoleState = {
            ...currentRoleState,
            [skillName]: {
              ...(currentRoleState[skillName] || {}),
              [levelKey]: { level, required }
            }
          };

          newState.roleStates = {
            ...state.roleStates,
            [roleId]: updatedRoleState
          };

          newState.currentStates = {
            ...state.currentStates,
            [roleId]: updatedRoleState
          };

          newState.hasChanges = true;
          
          persistState(roleId, updatedRoleState);
          return newState;
        });
      },

      setSkillProgression: (skillName, progression, roleId) => {
        console.log('Setting skill progression:', { skillName, progression, roleId });
        set((state) => {
          const currentRoleState = state.roleStates[roleId] || {};
          const updatedRoleState = {
            ...currentRoleState,
            [skillName]: {
              ...(currentRoleState[skillName] || {}),
              ...progression
            }
          };

          const newState = {
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

          persistState(roleId, updatedRoleState);
          return newState;
        });
      },

      resetLevels: (roleId) => {
        console.log('Resetting levels for role:', roleId);
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
        persistState(roleId, freshState);
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

      initializeState: (roleId) => {
        const currentState = get().roleStates[roleId];
        if (!currentState) {
          console.log('Initializing state for role:', roleId);
          const savedState = loadPersistedState(roleId);
          
          if (savedState) {
            console.log('Loaded saved state for role:', roleId);
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
            console.log('Creating new state for role:', roleId);
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
      },

      getEmployeeSkillState: (employeeId, skillName) => {
        const employeeState = get().employeeStates[employeeId];
        if (employeeState && employeeState[skillName]) {
          console.log('Found employee skill state:', {
            employeeId,
            skillName,
            state: employeeState[skillName]
          });
          return employeeState[skillName];
        }
        console.log('No state found for employee skill:', {
          employeeId,
          skillName
        });
        return null;
      },

      initializeEmployeeState: (employeeId, skills) => {
        console.log('Initializing employee state:', {
          employeeId,
          skillCount: skills.length
        });
        
        set((state) => {
          const employeeState = state.employeeStates[employeeId] || {};
          const newState = { ...employeeState };

          skills.forEach(skill => {
            if (!newState[skill.title]) {
              newState[skill.title] = {
                level: skill.level || 'unspecified',
                required: skill.requirement || 'preferred'
              };
            }
          });

          return {
            ...state,
            employeeStates: {
              ...state.employeeStates,
              [employeeId]: newState
            }
          };
        });
      }
    }),
    {
      name: 'competency-storage',
      version: 24,
      partialize: (state) => ({
        roleStates: state.roleStates,
        currentStates: state.currentStates,
        originalStates: state.originalStates,
        employeeStates: state.employeeStates
      })
    }
  )
);