import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CompetencyState } from './state/types';
import { initializeSkillStates } from './state/initialState';

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set, get) => ({
      currentStates: {},
      originalStates: {},
      hasChanges: false,
      initializeStates: (roleId: string) => {
        // Only initialize if no states exist
        if (Object.keys(get().currentStates).length === 0) {
          const initializedStates = initializeSkillStates(roleId);
          console.log('Setting initial competency states');
          
          set({
            currentStates: initializedStates,
            originalStates: JSON.parse(JSON.stringify(initializedStates)),
            hasChanges: false
          });
        }
      },
      setSkillState: (skillName, level, levelKey, required, roleId) => {
        console.log('Setting competency state:', { 
          skillName, 
          level, 
          levelKey, 
          required
        });
        
        set((state) => {
          const newStates = JSON.parse(JSON.stringify(state.currentStates));
          
          if (!newStates[skillName]) {
            newStates[skillName] = {};
          }
          
          newStates[skillName][levelKey] = {
            level,
            required,
          };
          
          const hasChanges = JSON.stringify(newStates) !== 
                            JSON.stringify(state.originalStates);
          
          return { 
            currentStates: newStates,
            hasChanges
          };
        });
      },
      setSkillProgression: (skillName, progression) => {
        console.log('Setting skill progression:', { 
          skillName, 
          progression
        });
        
        set((state) => {
          const newStates = JSON.parse(JSON.stringify(state.currentStates));
          
          if (!newStates[skillName]) {
            newStates[skillName] = {};
          }

          newStates[skillName] = {
            ...newStates[skillName],
            ...progression
          };

          return {
            currentStates: newStates,
            hasChanges: true,
          };
        });
      },
      resetLevels: () => {
        console.log('Resetting all levels');
        
        set((state) => {
          const newStates = JSON.parse(JSON.stringify(state.currentStates));
          
          Object.keys(newStates).forEach(skillName => {
            Object.keys(newStates[skillName]).forEach(levelKey => {
              newStates[skillName][levelKey] = {
                level: 'unspecified',
                required: 'preferred'
              };
            });
          });
          
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