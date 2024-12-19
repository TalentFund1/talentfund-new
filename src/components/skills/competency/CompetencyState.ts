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
      employeeStates: {}, // New state object to store employee-specific states
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
          // Create a unique key for this employee's skill state
          const employeeKey = `${employeeId}-${roleId}`;
          
          const newEmployeeStates = {
            ...state.employeeStates,
            [employeeKey]: {
              ...state.employeeStates[employeeKey],
              [skillName]: {
                ...state.employeeStates[employeeKey]?.[skillName],
                [levelKey]: { level, required }
              }
            }
          };

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

      setSkillProgression: (skillName, progression, roleId, employeeId) => {
        console.log('Setting skill progression:', { 
          skillName, 
          progression, 
          roleId,
          employeeId 
        });
        
        set((state) => {
          const employeeKey = `${employeeId}-${roleId}`;
          
          const newEmployeeStates = {
            ...state.employeeStates,
            [employeeKey]: {
              ...state.employeeStates[employeeKey],
              [skillName]: progression
            }
          };

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
            employeeStates: newEmployeeStates,
            hasChanges: true
          };
        });
      },

      getEmployeeSkillState: (skillName, employeeId, roleId) => {
        const state = get();
        const employeeKey = `${employeeId}-${roleId}`;
        return state.employeeStates[employeeKey]?.[skillName];
      },

      resetLevels: (roleId, employeeId) => {
        console.log('Resetting levels for role and employee:', { roleId, employeeId });
        set((state) => {
          const employeeKey = `${employeeId}-${roleId}`;
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
            employeeStates: {
              ...state.employeeStates,
              [employeeKey]: freshState
            },
            hasChanges: true
          };
        });
      },

      saveChanges: (roleId, employeeId) => {
        console.log('Saving changes for role and employee:', { roleId, employeeId });
        set((state) => {
          const employeeKey = `${employeeId}-${roleId}`;
          
          return {
            originalStates: {
              ...state.originalStates,
              [employeeKey]: { ...state.employeeStates[employeeKey] }
            },
            hasChanges: false
          };
        });
      },

      cancelChanges: (roleId, employeeId) => {
        console.log('Canceling changes for role and employee:', { roleId, employeeId });
        set((state) => {
          const employeeKey = `${employeeId}-${roleId}`;
          
          return {
            employeeStates: {
              ...state.employeeStates,
              [employeeKey]: { ...state.originalStates[employeeKey] }
            },
            roleStates: {
              ...state.roleStates,
              [roleId]: { ...state.originalStates[roleId] }
            },
            currentStates: {
              ...state.currentStates,
              [roleId]: { ...state.originalStates[roleId] }
            },
            hasChanges: false
          };
        });
      },

      initializeState: (roleId, employeeId) => {
        const state = get();
        const employeeKey = `${employeeId}-${roleId}`;
        
        if (!state.employeeStates[employeeKey]) {
          console.log('Initializing state for role and employee:', { roleId, employeeId });
          const savedState = loadPersistedState(employeeKey);
          
          if (savedState) {
            console.log('Loaded saved state for employee:', employeeKey);
            set((state) => ({
              employeeStates: {
                ...state.employeeStates,
                [employeeKey]: savedState
              }
            }));
          } else {
            console.log('Creating new state for employee:', employeeKey);
            const initialState = initializeRoleState(roleId);
            set((state) => ({
              employeeStates: {
                ...state.employeeStates,
                [employeeKey]: initialState
              }
            }));
          }
        }
      },

      getRoleState: (roleId, employeeId) => {
        const state = get();
        const employeeKey = `${employeeId}-${roleId}`;
        return state.employeeStates[employeeKey] || {};
      }
    }),
    {
      name: 'competency-storage',
      version: 22,
      partialize: (state) => ({
        roleStates: state.roleStates,
        currentStates: state.currentStates,
        originalStates: state.originalStates,
        employeeStates: state.employeeStates
      }),
      merge: (persistedState: any, currentState: CompetencyState) => {
        console.log('Merging persisted state with current state');
        return {
          ...currentState,
          roleStates: persistedState.roleStates || {},
          currentStates: persistedState.currentStates || {},
          originalStates: persistedState.originalStates || {},
          employeeStates: persistedState.employeeStates || {}
        };
      }
    }
  )
);