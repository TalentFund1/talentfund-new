import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompetencyState, SkillState } from './state/types';

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set, get) => ({
      currentStates: {},
      originalStates: {},
      hasChanges: false,
      setSkillState: (skillName, level, levelKey, required) => {
        console.log('Setting competency state:', { 
          skillName, 
          level, 
          levelKey, 
          required,
          currentStates: get().currentStates
        });
        
        set((state) => {
          // Create new state object to ensure updates are tracked
          const newStates = {
            ...state.currentStates,
            [skillName]: {
              ...state.currentStates[skillName],
              [levelKey]: {
                level,
                required,
              },
            },
          };
          
          console.log('Updated states:', {
            previous: state.currentStates,
            new: newStates
          });
          
          // Check if there are actual changes
          const hasChanges = JSON.stringify(newStates) !== JSON.stringify(state.originalStates);
          
          return { 
            currentStates: newStates,
            hasChanges
          };
        });
      },
      setSkillProgression: (skillName, progression) => {
        console.log('Setting skill progression:', { 
          skillName, 
          progression,
          currentStates: get().currentStates 
        });
        
        set((state) => {
          const newStates = {
            ...state.currentStates,
            [skillName]: {
              ...state.currentStates[skillName],
              ...progression,
            },
          };
          
          return {
            currentStates: newStates,
            hasChanges: true
          };
        });
      },
      resetLevels: () => {
        console.log('Resetting all levels to default values');
        const currentStates = get().currentStates;
        
        // Create new states with default values for each skill
        const resetStates = Object.keys(currentStates).reduce((acc, skillName) => {
          const levels = Object.keys(currentStates[skillName]);
          
          acc[skillName] = levels.reduce((levelAcc, level) => {
            levelAcc[level] = {
              level: 'unspecified',
              required: 'preferred'
            };
            return levelAcc;
          }, {} as Record<string, SkillState>);
          
          return acc;
        }, {} as Record<string, Record<string, SkillState>>);

        console.log('Reset states:', resetStates);
        
        set({
          currentStates: resetStates,
          originalStates: resetStates,
          hasChanges: false
        });
      },
      saveChanges: () => {
        console.log('Saving changes to competency store');
        set((state) => {
          // Create deep copy of current states to ensure proper persistence
          const savedStates = JSON.parse(JSON.stringify(state.currentStates));
          return {
            currentStates: savedStates,
            originalStates: savedStates,
            hasChanges: false
          };
        });
      },
      cancelChanges: () => {
        console.log('Cancelling changes');
        set((state) => ({
          currentStates: { ...state.originalStates },
          hasChanges: false
        }));
      }
    }),
    {
      name: 'competency-storage',
      skipHydration: false,
      partialize: (state) => ({
        currentStates: state.currentStates,
        originalStates: state.originalStates
      }),
      version: 1 // Added version for better state management
    }
  )
);