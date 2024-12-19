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
      employeeStates: {}, // Add employee-specific states
      hasChanges: false,

      setSkillState: (skillName, level, levelKey, required, roleId, employeeId) => {
        console.log('Setting skill state:', { 
          skillName, 
          level, 
          levelKey, 
          required, 
          roleId,
          employeeId 
        });
        
        set((state) => {
          // Update employee-specific state
          const newEmployeeStates = {
            ...state.employeeStates,
            [employeeId]: {
              ...state.employeeStates[employeeId],
              [skillName]: {
                level,
                required
              }
            }
          };

          // Update role-based state for benchmarking
          const newRoleStates = setSkillStateAction(
            state.roleStates,
            skillName,
            level,
            levelKey,
            required,
            roleId
          );

          return {
            roleStates: newRoleStates,
            currentStates: {
              ...state.currentStates,
              [roleId]: newRoleStates[roleId]
            },
            employeeStates: newEmployeeStates,
            hasChanges: true
          };
        });
      },

      setSkillProgression: (skillName, progression, roleId) => {
        console.log('Setting skill progression:', { skillName, progression, roleId });
        set((state) => {
          const newRoleStates = setSkillProgressionAction(
            state.roleStates,
            skillName,
            progression,
            roleId
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

      resetLevels: (roleId) => {
        console.log('Resetting levels for role:', roleId);
        set((state) => {
          const freshState = initializeRoleState(roleId);
          return {
            roleStates: {
              ...state.roleStates,
              [roleId]: freshState
            },
            currentStates: {
              ...state.currentStates,
              [roleId]: freshState
            },
            hasChanges: true
          };
        });
      },

      saveChanges: (roleId) => {
        console.log('Saving changes for role:', roleId);
        set((state) => {
          const currentRoleState = state.roleStates[roleId];
          return {
            originalStates: {
              ...state.originalStates,
              [roleId]: { ...currentRoleState }
            },
            hasChanges: false
          };
        });
      },

      cancelChanges: (roleId) => {
        console.log('Canceling changes for role:', roleId);
        set((state) => {
          const originalRoleState = state.originalStates[roleId];
          return {
            roleStates: {
              ...state.roleStates,
              [roleId]: { ...originalRoleState }
            },
            currentStates: {
              ...state.currentStates,
              [roleId]: { ...originalRoleState }
            },
            hasChanges: false
          };
        });
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
        const state = get().employeeStates[employeeId];
        if (state && state[skillName]) {
          console.log('Found employee skill state:', {
            employeeId,
            skillName,
            state: state[skillName]
          });
          return state[skillName];
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
      version: 24, // Increment version to ensure clean state
      partialize: (state) => ({
        roleStates: state.roleStates,
        currentStates: state.currentStates,
        originalStates: state.originalStates,
        employeeStates: state.employeeStates
      })
    }
  )
);
