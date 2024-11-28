import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompetencyState, SkillState } from './state/types';
import { initializeSkillStates } from './state/initialState';

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
          // Initialize the skill state if it doesn't exist
          const existingSkillStates = state.currentStates[skillName] || {};
          
          const newStates = {
            ...state.currentStates,
            [skillName]: {
              ...existingSkillStates,
              [levelKey]: {
                level,
                required,
              },
            },
          };
          
          console.log('Updated competency states:', {
            previous: state.currentStates,
            new: newStates
          });
          
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
        const defaultStates = initializeSkillStates("123"); // Initialize with default role
        
        set({
          currentStates: defaultStates,
          originalStates: defaultStates,
          hasChanges: false
        });
      },
      saveChanges: () => {
        console.log('Saving competency changes');
        set((state) => ({
          originalStates: JSON.parse(JSON.stringify(state.currentStates)), // Deep copy
          hasChanges: false
        }));
      },
      cancelChanges: () => {
        console.log('Cancelling competency changes');
        set((state) => ({
          currentStates: JSON.parse(JSON.stringify(state.originalStates)), // Deep copy
          hasChanges: false
        }));
      },
      initializeState: (roleId: string) => {
        console.log('Initializing competency state for role:', roleId);
        const initialStates = initializeSkillStates(roleId);
        set({
          currentStates: initialStates,
          originalStates: initialStates,
          hasChanges: false
        });
      }
    }),
    {
      name: 'competency-storage',
      version: 1,
      skipHydration: false,
      partialize: (state) => ({
        currentStates: state.currentStates,
        originalStates: state.originalStates
      })
    }
  )
);