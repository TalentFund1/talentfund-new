import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompetencyState } from './state/types';
import { setSkillStateAction, setSkillProgressionAction } from './state/stateActions';
import { loadPersistedState } from './state/persistenceUtils';
import { initializeRoleState } from './state/initializeState';
import { useRoleSkillsStore } from '../store/roleSkillsStore';

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set, get) => ({
      roleStates: {},
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setSkillState: (skillName, level, levelKey, required, roleId) => {
        console.log('Setting skill state:', { skillName, level, levelKey, required, roleId });
        
        // Initialize role skills if needed
        useRoleSkillsStore.getState().initializeRoleSkills(roleId);
        
        set((state) => {
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
          
          // Initialize role skills first
          useRoleSkillsStore.getState().initializeRoleSkills(roleId);
          
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
      }
    }),
    {
      name: 'competency-storage',
      version: 22,
      partialize: (state) => ({
        roleStates: state.roleStates,
        currentStates: state.currentStates,
        originalStates: state.originalStates
      })
    }
  )
);