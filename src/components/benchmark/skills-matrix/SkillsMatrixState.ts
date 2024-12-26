import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { filterSkillsByCategory } from '../skills-matrix/skillCategories';
import { benchmarkingService } from '../../../services/benchmarking';

interface SkillState {
  level: string;
  goalStatus: string;
  lastUpdated: string;
}

interface SkillsMatrixState {
  currentStates: { [key: string]: SkillState };
  hasChanges: boolean;
  setSkillState: (skillTitle: string, level: string, goalStatus: string) => void;
  resetSkills: () => void;
  initializeState: (skillTitle: string, level: string, goalStatus: string) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
}

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set) => ({
      currentStates: {},
      hasChanges: false,

      setSkillState: (skillTitle, level, goalStatus) => {
        console.log('Setting skill state in matrix:', { skillTitle, level, goalStatus });
        
        set((state) => ({
          currentStates: {
            ...state.currentStates,
            [skillTitle]: benchmarkingService.createSkillState(level, goalStatus)
          },
          hasChanges: true,
        }));
      },

      resetSkills: () =>
        set(() => ({
          currentStates: {},
          hasChanges: false,
        })),

      initializeState: (skillTitle, level, goalStatus) =>
        set((state) => {
          if (!state.currentStates[skillTitle]) {
            console.log('Initializing skill state:', { skillTitle, level, goalStatus });
            return {
              currentStates: {
                ...state.currentStates,
                [skillTitle]: benchmarkingService.createSkillState(level, goalStatus)
              },
            };
          }
          return state;
        }),

      saveChanges: () => {
        set(() => ({
          hasChanges: false,
        }));
      },

      cancelChanges: () =>
        set(() => ({
          hasChanges: false,
        })),
    }),
    {
      name: 'skills-matrix-storage',
      version: 2,
      partialize: (state) => ({
        currentStates: state.currentStates,
      }),
    }
  )
);

export const useSkillsMatrixState = (
  selectedCategory: string,
  selectedLevel: string,
  selectedInterest: string
) => {
  const { currentStates } = useSkillsMatrixStore();

  const filterAndSortSkills = (skills: UnifiedSkill[]) => {
    console.log('Filtering skills:', { 
      totalSkills: skills.length,
      selectedCategory,
      selectedLevel,
      selectedInterest 
    });

    let filteredSkills = [...skills];

    if (selectedCategory !== "all") {
      filteredSkills = filterSkillsByCategory(filteredSkills, selectedCategory);
    }

    if (selectedLevel !== "all") {
      filteredSkills = filteredSkills.filter((skill) => {
        const skillState = currentStates[skill.title];
        return skillState?.level.toLowerCase() === selectedLevel.toLowerCase();
      });
    }

    if (selectedInterest !== "all") {
      filteredSkills = filteredSkills.filter((skill) => {
        const skillState = currentStates[skill.title];
        if (!skillState?.goalStatus) return false;

        return benchmarkingService.matchesInterestFilter(skillState.goalStatus, selectedInterest);
      });
    }

    return filteredSkills.sort((a, b) => a.title.localeCompare(b.title));
  };

  return {
    filterAndSortSkills,
  };
};