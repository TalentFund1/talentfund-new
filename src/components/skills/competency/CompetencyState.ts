import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
          
          localStorage.setItem(getStorageKey(roleId), JSON.stringify(initializedStates));
          
          return newState;
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
          
          // Immediately save to localStorage
          localStorage.setItem(getStorageKey(roleId), JSON.stringify(newStates[roleId]));
          
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

          // Immediately save to localStorage
          localStorage.setItem(getStorageKey(currentRoleId), JSON.stringify(newStates[currentRoleId]));

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
          
          // Immediately save to localStorage
          localStorage.setItem(getStorageKey(roleId), JSON.stringify(newStates[roleId]));
          
          return { 
            currentStates: newStates,
            hasChanges: true
          };
        });
      },
      saveChanges: () => {
        const currentStates = get().currentStates;
        
        Object.entries(currentStates).forEach(([roleId, roleStates]) => {
          localStorage.setItem(getStorageKey(roleId), JSON.stringify(roleStates));
        });
        
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
      skipHydration: true,
      partialize: (state) => ({
        originalStates: state.originalStates,
        currentStates: state.currentStates,
      }),
    }
  )
);