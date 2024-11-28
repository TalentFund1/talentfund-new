import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompetencyState, SkillState } from './state/types';
import { roleSkills } from '../data/roleSkills';
import { loadRoleState, saveRoleState } from './state/roleStateManager';
import { getCurrentRoleState, getSkillState } from './state/stateSelectors';

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
          const roleState = getCurrentRoleState(state.roleStates, roleId);
          const updatedRoleState = {
            ...roleState,
            [skillName]: {
              ...roleState[skillName],
              [levelKey]: { level, required }
            }
          };

          const newRoleStates = {
            ...state.roleStates,
            [roleId]: updatedRoleState
          };

          saveRoleState(roleId, updatedRoleState);

          return {
            roleStates: newRoleStates,
            currentStates: updatedRoleState,
            hasChanges: true
          };
        });
      },

      setSkillProgression: (skillName, progression, roleId) => {
        console.log('Setting skill progression:', { skillName, progression, roleId });
        
        set((state) => {
          const roleState = getCurrentRoleState(state.roleStates, roleId);
          const updatedRoleState = {
            ...roleState,
            [skillName]: {
              ...roleState[skillName],
              ...progression
            }
          };

          saveRoleState(roleId, updatedRoleState);

          return {
            roleStates: {
              ...state.roleStates,
              [roleId]: updatedRoleState
            },
            currentStates: updatedRoleState,
            hasChanges: true
          };
        });
      },

      resetLevels: (roleId) => {
        console.log('Resetting levels for role:', roleId);
        
        const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
        if (!currentRoleSkills) {
          console.warn('No skills found for role:', roleId);
          return;
        }

        const allSkills = [
          ...currentRoleSkills.specialized,
          ...currentRoleSkills.common,
          ...currentRoleSkills.certifications
        ];
        
        const defaultStates: Record<string, Record<string, SkillState>> = {};
        
        allSkills.forEach(skill => {
          defaultStates[skill.title] = {};
          ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'm3', 'm4', 'm5', 'm6'].forEach(level => {
            defaultStates[skill.title][level] = {
              level: 'unspecified',
              required: 'preferred'
            };
          });
        });

        saveRoleState(roleId, defaultStates);
        
        set(state => ({
          roleStates: {
            ...state.roleStates,
            [roleId]: defaultStates
          },
          currentStates: defaultStates,
          originalStates: defaultStates,
          hasChanges: false
        }));
      },

      saveChanges: (roleId) => {
        console.log('Saving changes for role:', roleId);
        const roleState = getCurrentRoleState(get().roleStates, roleId);
        saveRoleState(roleId, roleState);
        
        set((state) => ({
          roleStates: {
            ...state.roleStates,
            [roleId]: roleState
          },
          currentStates: roleState,
          originalStates: roleState,
          hasChanges: false
        }));
      },

      cancelChanges: (roleId) => {
        console.log('Cancelling changes for role:', roleId);
        const savedState = loadRoleState(roleId);
        
        set((state) => ({
          roleStates: {
            ...state.roleStates,
            [roleId]: savedState
          },
          currentStates: savedState,
          originalStates: savedState,
          hasChanges: false
        }));
      },

      initializeState: (roleId) => {
        console.log('Initializing state for role:', roleId);
        const savedState = loadRoleState(roleId);
        
        if (Object.keys(savedState).length > 0) {
          set(state => ({
            roleStates: {
              ...state.roleStates,
              [roleId]: savedState
            },
            currentStates: savedState,
            originalStates: savedState,
            hasChanges: false
          }));
          return;
        }

        const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
        if (!currentRoleSkills) {
          console.warn('No skills found for role:', roleId);
          return;
        }

        const allSkills = [
          ...currentRoleSkills.specialized,
          ...currentRoleSkills.common,
          ...currentRoleSkills.certifications
        ];

        const initialStates: Record<string, Record<string, SkillState>> = {};
        allSkills.forEach(skill => {
          initialStates[skill.title] = {};
          ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'm3', 'm4', 'm5', 'm6'].forEach(level => {
            initialStates[skill.title][level] = {
              level: 'unspecified',
              required: 'preferred'
            };
          });
        });

        saveRoleState(roleId, initialStates);
        
        set(state => ({
          roleStates: {
            ...state.roleStates,
            [roleId]: initialStates
          },
          currentStates: initialStates,
          originalStates: initialStates,
          hasChanges: false
        }));
      },

      getRoleState: (roleId) => {
        return getCurrentRoleState(get().roleStates, roleId);
      }
    }),
    {
      name: 'competency-storage',
      version: 6,
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