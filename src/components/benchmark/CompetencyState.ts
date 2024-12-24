import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { benchmarkingService } from '../../services/benchmarking';

export interface SkillState {
  level: string;
  required: string;
}

interface CompetencyState {
  currentStates: Record<string, Record<string, SkillState>>;
  setSkillState: (skillName: string, level: string, levelKey: string, required: string) => void;
}

const defaultSkillState: SkillState = {
  level: 'unspecified',
  required: 'unknown'
};

export const useCompetencyStore = create<CompetencyState>()(
  persist(
    (set) => ({
      currentStates: {},
      setSkillState: (skillName, level, levelKey, required) => {
        console.log('Setting skill state:', { skillName, level, levelKey, required });
        set((state) => {
          const newState = benchmarkingService.updateCompetencyState(
            state.currentStates,
            skillName,
            level,
            levelKey,
            required,
            defaultSkillState
          );

          console.log('Updated competency state:', {
            skillName,
            levelKey,
            newState: newState[skillName][levelKey]
          });

          return { currentStates: newState };
        });
      },
    }),
    {
      name: 'competency-matrix-storage',
      version: 25,
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