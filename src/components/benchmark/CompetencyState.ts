import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SkillState {
  level: string;
  required: string;
}

interface CompetencyState {
  currentStates: Record<string, Record<string, Record<string, SkillState>>>;
  setSkillState: (employeeId: string, skillName: string, level: string, levelKey: string, required: string) => void;
}

const defaultSkillState: SkillState = {
  level: 'unspecified',
  required: 'preferred'
};

// Separate level arrays for different tracks
const professionalLevels = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'];
const managerialLevels = ['m3', 'm4', 'm5', 'm6'];

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set) => ({
      currentStates: {},
      setSkillState: (employeeId, skillName, level, levelKey, required) => {
        console.log('Setting skill state:', { employeeId, skillName, level, levelKey, required });
        set((state) => {
          // Initialize the employee state if it doesn't exist
          if (!state.currentStates[employeeId]) {
            state.currentStates[employeeId] = {};
          }

          // Initialize the skill state if it doesn't exist
          if (!state.currentStates[employeeId][skillName]) {
            console.log('Initializing new skill with default states:', skillName);
            const initialSkillState: Record<string, SkillState> = {};
            
            // Determine track based on level key
            const isManagerial = levelKey.toLowerCase().startsWith('m');
            const levels = isManagerial ? managerialLevels : professionalLevels;
            
            console.log('Using track levels:', {
              isManagerial,
              levels,
              levelKey
            });
            
            // Initialize all levels with default state
            levels.forEach(level => {
              initialSkillState[level] = { ...defaultSkillState };
            });
            
            state.currentStates[employeeId][skillName] = initialSkillState;
          }

          return {
            currentStates: {
              ...state.currentStates,
              [employeeId]: {
                ...state.currentStates[employeeId],
                [skillName]: {
                  ...state.currentStates[employeeId][skillName],
                  [levelKey]: {
                    level,
                    required,
                  },
                },
              },
            },
          };
        });
      },
    }),
    {
      name: 'competency-matrix-storage',
      version: 24, // Increment version to ensure clean state
      partialize: (state) => ({
        currentStates: state.currentStates,
      }),
      merge: (persistedState: any, currentState: CompetencyState) => {
        console.log('Merging persisted state:', persistedState);
        return {
          ...currentState,
          currentStates: persistedState.currentStates || {},
        };
      },
    }
  )
);