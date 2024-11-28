import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompetencyState, SkillState } from './state/types';
import { roleSkills } from '../data/roleSkills';

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set, get) => ({
      roleStates: {},
      currentStates: {},
      originalStates: {},
      hasChanges: false,
      setSkillState: (skillName, level, levelKey, required, roleId) => {
        console.log('Setting competency state:', { 
          skillName, 
          level, 
          levelKey, 
          required,
          roleId,
          currentStates: get().currentStates
        });
        
        set((state) => {
          const roleStates = {
            ...state.roleStates,
            [roleId]: {
              ...state.roleStates[roleId],
              [skillName]: {
                ...state.roleStates[roleId]?.[skillName],
                [levelKey]: {
                  level,
                  required,
                },
              },
            },
          };

          const newStates = JSON.parse(JSON.stringify({
            ...state.currentStates,
            [skillName]: {
              ...state.currentStates[skillName],
              [levelKey]: {
                level,
                required,
              },
            },
          }));
          
          console.log('Updated competency states:', {
            previous: state.currentStates,
            new: newStates,
            roleStates
          });
          
          const hasChanges = JSON.stringify(newStates) !== JSON.stringify(state.originalStates);
          
          return { 
            roleStates,
            currentStates: newStates,
            hasChanges
          };
        });
      },
      setSkillProgression: (skillName, progression, roleId) => {
        console.log('Setting skill progression:', { 
          skillName, 
          progression,
          roleId,
          currentStates: get().currentStates 
        });
        
        set((state) => {
          const roleStates = {
            ...state.roleStates,
            [roleId]: {
              ...state.roleStates[roleId],
              [skillName]: {
                ...state.roleStates[roleId]?.[skillName],
                ...progression,
              },
            },
          };

          const newStates = JSON.parse(JSON.stringify({
            ...state.currentStates,
            [skillName]: {
              ...state.currentStates[skillName],
              ...progression,
            },
          }));
          
          return {
            roleStates,
            currentStates: newStates,
            hasChanges: true
          };
        });
      },
      resetLevels: (roleId) => {
        console.log('Resetting all levels to default values for role:', roleId);
        
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
          
          ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'].forEach(level => {
            defaultStates[skill.title][level] = {
              level: 'unspecified',
              required: 'preferred'
            };
          });
          
          ['m3', 'm4', 'm5', 'm6'].forEach(level => {
            defaultStates[skill.title][level] = {
              level: 'unspecified',
              required: 'preferred'
            };
          });
        });

        console.log('Reset states created for role:', { roleId, defaultStates });
        
        set(state => ({
          roleStates: {
            ...state.roleStates,
            [roleId]: defaultStates
          },
          currentStates: defaultStates,
          originalStates: JSON.parse(JSON.stringify(defaultStates)),
          hasChanges: false
        }));
      },
      saveChanges: (roleId) => {
        console.log('Saving competency changes for role:', roleId);
        set((state) => ({
          roleStates: {
            ...state.roleStates,
            [roleId]: JSON.parse(JSON.stringify(state.currentStates))
          },
          originalStates: JSON.parse(JSON.stringify(state.currentStates)),
          hasChanges: false
        }));
      },
      cancelChanges: (roleId) => {
        console.log('Cancelling competency changes for role:', roleId);
        const roleState = get().roleStates[roleId] || {};
        set((state) => ({
          currentStates: JSON.parse(JSON.stringify(roleState)),
          originalStates: JSON.parse(JSON.stringify(roleState)),
          hasChanges: false
        }));
      },
      initializeState: (roleId: string) => {
        console.log('Initializing competency state for role:', roleId);
        
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
          
          ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'].forEach(level => {
            initialStates[skill.title][level] = {
              level: 'unspecified',
              required: 'preferred'
            };
          });
          
          ['m3', 'm4', 'm5', 'm6'].forEach(level => {
            initialStates[skill.title][level] = {
              level: 'unspecified',
              required: 'preferred'
            };
          });
        });

        console.log('Setting initial states for role:', { roleId, initialStates });
        
        set(state => ({
          roleStates: {
            ...state.roleStates,
            [roleId]: initialStates
          },
          currentStates: initialStates,
          originalStates: JSON.parse(JSON.stringify(initialStates)),
          hasChanges: false
        }));
      },
      getRoleState: (roleId: string) => {
        return get().roleStates[roleId] || {};
      }
    }),
    {
      name: 'competency-storage',
      version: 5,
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