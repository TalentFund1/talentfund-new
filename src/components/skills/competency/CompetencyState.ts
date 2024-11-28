import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SkillState {
  level: string;
  required: string;
}

interface CompetencyState {
  currentStates: Record<string, Record<string, SkillState>>;
  originalStates: Record<string, Record<string, SkillState>>;
  hasChanges: boolean;
  setSkillState: (skillName: string, level: string, levelKey: string, required: string) => void;
  setSkillProgression: (skillName: string, progression: Record<string, SkillState>) => void;
  resetLevels: () => void;
  saveChanges: () => void;
  cancelChanges: () => void;
}

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
          required
        });
        
        set((state) => {
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
          
          const hasChanges = JSON.stringify(newStates) !== JSON.stringify(state.originalStates);
          
          return {
            currentStates: newStates,
            hasChanges
          };
        });
      },
      setSkillProgression: (skillName, progression) => {
        console.log('Setting skill progression:', { skillName, progression });
        set((state) => {
          const newStates = {
            ...state.currentStates,
            [skillName]: progression,
          };
          
          return {
            currentStates: newStates,
            hasChanges: true
          };
        });
      },
      resetLevels: () => {
        console.log('Resetting all levels');
        set((state) => ({
          currentStates: {},
          originalStates: {},
          hasChanges: false
        }));
      },
      saveChanges: () => {
        console.log('Saving changes');
        set((state) => ({
          originalStates: { ...state.currentStates },
          hasChanges: false
        }));
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
      })
    }
  )
);