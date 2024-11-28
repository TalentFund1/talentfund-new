import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CompetencyState } from './state/types';
import { initializeSkillStates, getStorageKey } from './state/initialState';

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set, get) => ({
      currentStates: {},
      originalStates: {},
      hasChanges: false,
      initializeStates: (roleId: string) => {
        const initializedStates = initializeSkillStates(roleId);
        console.log('Setting initial competency states for role:', roleId);
        
        set((state) => {
          // Only initialize if states don't exist for this role
          if (!state.currentStates[roleId]) {
            console.log('Initializing new states for role:', roleId);
            const newState = {
              currentStates: {
                ...state.currentStates,
                [roleId]: JSON.parse(JSON.stringify(initializedStates))
              },
              originalStates: {
                ...state.originalStates,
                [roleId]: JSON.parse(JSON.stringify(initializedStates))
              },
              hasChanges: false
            };
            return newState;
          }
          console.log('States already exist for role:', roleId);
          return state;
        });
      },
      setSkillState: (skillName, level, levelKey, required, roleId) => {
        console.log('Setting competency state:', { skillName, level, levelKey, required, roleId });
        
        set((state) => {
          const newStates = JSON.parse(JSON.stringify(state.currentStates));
          
          if (!newStates[roleId]) {
            newStates[roleId] = {};
          }
          if (!newStates[roleId][skillName]) {
            newStates[roleId][skillName] = {};
          }
          
          newStates[roleId][skillName][levelKey] = {
            level,
            required,
          };
          
          const hasChanges = JSON.stringify(newStates[roleId]) !== JSON.stringify(state.originalStates[roleId]);
          
          return { 
            currentStates: newStates,
            hasChanges
          };
        });
      },
      setSkillProgression: (skillName, progression, roleId) => {
        console.log('Setting skill progression:', { skillName, progression, roleId });
        
        set((state) => {
          const currentRoleId = roleId || Object.keys(state.currentStates)[0];
          if (!currentRoleId) return state;

          const newStates = JSON.parse(JSON.stringify(state.currentStates));
          
          if (!newStates[currentRoleId]) {
            newStates[currentRoleId] = {};
          }
          
          if (!newStates[currentRoleId][skillName]) {
            newStates[currentRoleId][skillName] = {};
          }

          newStates[currentRoleId][skillName] = {
            ...newStates[currentRoleId][skillName],
            ...progression
          };

          return {
            currentStates: newStates,
            hasChanges: true,
          };
        });
      },
      resetLevels: (roleId: string) => {
        console.log('Resetting all levels for role:', roleId);
        
        set((state) => {
          const newStates = JSON.parse(JSON.stringify(state.currentStates));
          
          if (newStates[roleId]) {
            Object.keys(newStates[roleId]).forEach(skillName => {
              Object.keys(newStates[roleId][skillName]).forEach(levelKey => {
                newStates[roleId][skillName][levelKey] = {
                  level: 'unspecified',
                  required: 'preferred'
                };
              });
            });
          }
          
          return { 
            currentStates: newStates,
            hasChanges: true
          };
        });
      },
      saveChanges: () => {
        console.log('Saving competency changes');
        set((state) => ({
          originalStates: JSON.parse(JSON.stringify(state.currentStates)),
          hasChanges: false,
        }));
      },
      cancelChanges: () => {
        console.log('Cancelling competency changes');
        set((state) => ({
          currentStates: JSON.parse(JSON.stringify(state.originalStates)),
          hasChanges: false,
        }));
      },
    }),
    {
      name: 'competency-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentStates: state.currentStates,
        originalStates: state.originalStates,
      }),
    }
  )
);