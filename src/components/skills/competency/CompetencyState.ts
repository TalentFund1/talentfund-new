import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompetencyState } from './state/competencyTypes';
import { initializeRoleState } from './state/initializeState';
import { roleSkills } from '../data/roleSkills';

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set, get) => ({
      roleStates: {},
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setSkillState: (skillName, level, levelKey, required, roleId) => {
        console.log('Setting skill state:', { skillName, level, levelKey, required, roleId });
        set((state) => {
          const newRoleStates = {
            ...state.roleStates,
            [roleId]: {
              ...state.roleStates[roleId],
              [skillName]: {
                ...state.roleStates[roleId]?.[skillName],
                [levelKey]: { level: level || 'unspecified', required: required || 'preferred' }
              }
            }
          };

          console.log('New role states after update:', newRoleStates);

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
        const defaultedProgression = Object.entries(progression).reduce((acc, [key, value]) => ({
          ...acc,
          [key]: {
            level: value.level || 'unspecified',
            required: value.required || 'preferred'
          }
        }), {});

        set((state) => {
          const newRoleStates = {
            ...state.roleStates,
            [roleId]: {
              ...state.roleStates[roleId],
              [skillName]: {
                ...state.roleStates[roleId]?.[skillName],
                ...defaultedProgression
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

      resetLevels: (roleId) => {
        console.log('Resetting levels for role:', roleId);
        const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
        const allSkills = [
          ...currentRoleSkills.specialized,
          ...currentRoleSkills.common,
          ...currentRoleSkills.certifications
        ];

        set((state) => {
          const resetState = {};
          
          allSkills.forEach(skill => {
            resetState[skill.title] = {};
            ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'm3', 'm4', 'm5', 'm6'].forEach(level => {
              resetState[skill.title][level] = {
                level: 'unspecified',
                required: 'preferred'
              };
            });
          });

          console.log('Reset state:', resetState);
          
          return {
            roleStates: {
              ...state.roleStates,
              [roleId]: resetState
            },
            currentStates: {
              ...state.currentStates,
              [roleId]: resetState
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
              [roleId]: currentRoleState
            },
            hasChanges: false
          };
        });
      },

      cancelChanges: (roleId) => {
        console.log('Cancelling changes for role:', roleId);
        set((state) => {
          const originalRoleState = state.originalStates[roleId];
          return {
            roleStates: {
              ...state.roleStates,
              [roleId]: originalRoleState
            },
            currentStates: {
              ...state.currentStates,
              [roleId]: originalRoleState
            },
            hasChanges: false
          };
        });
      },

      initializeState: (roleId) => {
        console.log('Initializing state for role:', roleId);
        const currentState = get().roleStates[roleId];
        
        if (!currentState) {
          const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
          const allSkills = [
            ...currentRoleSkills.specialized,
            ...currentRoleSkills.common,
            ...currentRoleSkills.certifications
          ];

          set((state) => {
            const newState = {};
            
            allSkills.forEach(skill => {
              newState[skill.title] = {};
              ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'm3', 'm4', 'm5', 'm6'].forEach(level => {
                newState[skill.title][level] = {
                  level: 'unspecified',
                  required: 'preferred'
                };
              });
            });

            console.log('Initialized new state:', newState);
            
            return {
              roleStates: {
                ...state.roleStates,
                [roleId]: newState
              },
              currentStates: {
                ...state.currentStates,
                [roleId]: newState
              },
              originalStates: {
                ...state.originalStates,
                [roleId]: newState
              }
            };
          });
        }
      },

      getRoleState: (roleId) => {
        return get().roleStates[roleId] || {};
      }
    }),
    {
      name: 'competency-storage',
      version: 14, // Increment version to force rehydration with new state structure
      skipHydration: false,
      partialize: (state) => ({
        roleStates: state.roleStates,
        currentStates: state.currentStates,
        originalStates: state.originalStates
      }),
      onRehydrateStorage: () => (state) => {
        console.log('Rehydrated competency state:', state);
      }
    }
  )
);