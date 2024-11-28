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
        set((state) => ({
          roleStates: {
            ...state.roleStates,
            [roleId]: {
              ...state.roleStates[roleId],
              [skillName]: {
                ...state.roleStates[roleId]?.[skillName],
                [levelKey]: { level, required }
              }
            }
          },
          hasChanges: true
        }));
      },

      setSkillProgression: (skillName, progression, roleId) => {
        console.log('Setting skill progression:', { skillName, progression, roleId });
        set((state) => ({
          roleStates: {
            ...state.roleStates,
            [roleId]: {
              ...state.roleStates[roleId],
              [skillName]: {
                ...state.roleStates[roleId]?.[skillName],
                ...progression
              }
            }
          },
          hasChanges: true
        }));
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
            hasChanges: true
          };
        });
      },

      saveChanges: (roleId) => {
        console.log('Saving changes for role:', roleId);
        set({ hasChanges: false });
      },

      cancelChanges: (roleId) => {
        console.log('Cancelling changes for role:', roleId);
        set({ hasChanges: false });
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
            
            return {
              roleStates: {
                ...state.roleStates,
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
      version: 12,
      skipHydration: false,
      partialize: (state) => ({
        roleStates: state.roleStates
      }),
      onRehydrateStorage: () => (state) => {
        console.log('Rehydrated competency state:', state);
      }
    }
  )
);