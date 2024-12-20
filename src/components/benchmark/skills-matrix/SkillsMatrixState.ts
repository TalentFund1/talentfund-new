import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { useEmployeeStore } from '../../employee/store/employeeStore';
import { filterSkillsByCategory } from './skillCategories';

interface SkillState {
  level: string;
  requirement: string;
}

interface SkillsMatrixState {
  currentStates: { [key: string]: SkillState };
  originalStates: { [key: string]: SkillState };
  hasChanges: boolean;
  setSkillState: (skillTitle: string, level: string, requirement: string) => void;
  resetSkills: () => void;
  initializeState: (skillTitle: string, level: string, requirement: string) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
}

const getLevelPriority = (level: string = 'unspecified') => {
  const priorities: { [key: string]: number } = {
    'advanced': 0,
    'intermediate': 1,
    'beginner': 2,
    'unspecified': 3
  };
  return priorities[level.toLowerCase()] ?? 3;
};

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set) => ({
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setSkillState: (skillTitle, level, requirement) => {
        console.log('Setting skill state:', { skillTitle, level, requirement });
        set((state) => ({
          currentStates: {
            ...state.currentStates,
            [skillTitle]: { level, requirement },
          },
          hasChanges: true,
        }));
      },

      resetSkills: () => {
        console.log('Resetting skills state');
        set(() => ({
          currentStates: {},
          originalStates: {},
          hasChanges: false,
        }));
      },

      initializeState: (skillTitle, level, requirement) => {
        console.log('Initializing skill state:', { skillTitle, level, requirement });
        set((state) => {
          if (!state.currentStates[skillTitle]) {
            return {
              currentStates: {
                ...state.currentStates,
                [skillTitle]: { level, requirement },
              },
              originalStates: {
                ...state.originalStates,
                [skillTitle]: { level, requirement },
              },
            };
          }
          return state;
        });
      },

      saveChanges: () => {
        console.log('Saving skill changes');
        set((state) => ({
          originalStates: { ...state.currentStates },
          hasChanges: false,
        }));
      },

      cancelChanges: () => {
        console.log('Canceling skill changes');
        set((state) => ({
          currentStates: { ...state.originalStates },
          hasChanges: false,
        }));
      },
    }),
    {
      name: 'skills-matrix-storage',
      version: 1,
    }
  )
);

export const useSkillsMatrixState = (
  selectedCategory: string,
  selectedLevel: string,
  selectedInterest: string
) => {
  const { currentStates } = useSkillsMatrixStore();

  const filterAndSortSkills = (employeeId: string) => {
    console.log('Filtering skills for employee:', employeeId);
    const employeeSkills = getEmployeeSkills(employeeId);
    let filteredSkills = [...employeeSkills];

    if (selectedCategory !== "all") {
      filteredSkills = filterSkillsByCategory(filteredSkills, selectedCategory);
    }

    if (selectedLevel !== "all") {
      filteredSkills = filteredSkills.filter((skill) => {
        const state = currentStates[skill.title];
        return state?.level.toLowerCase() === selectedLevel.toLowerCase();
      });
    }

    if (selectedInterest !== "all") {
      filteredSkills = filteredSkills.filter((skill) => {
        const state = currentStates[skill.title];
        if (!state) return false;

        switch (selectedInterest.toLowerCase()) {
          case "skill_goal":
            return state.requirement === "required" || state.requirement === "skill_goal";
          case "not_interested":
            return state.requirement === "not_interested";
          case "unknown":
            return !state.requirement || state.requirement === "unknown";
          default:
            return state.requirement === selectedInterest.toLowerCase();
        }
      });
    }

    return filteredSkills.sort((a, b) => {
      const stateA = currentStates[a.title];
      const stateB = currentStates[b.title];

      const levelDiff = getLevelPriority(stateA?.level) - getLevelPriority(stateB?.level);
      if (levelDiff !== 0) return levelDiff;

      return a.title.localeCompare(b.title);
    });
  };

  return {
    filterAndSortSkills,
  };
};

export const getEmployeeSkills = (id: string): UnifiedSkill[] => {
  console.log('Getting skills for employee:', id);
  return useEmployeeStore.getState().getEmployeeSkills(id);
};