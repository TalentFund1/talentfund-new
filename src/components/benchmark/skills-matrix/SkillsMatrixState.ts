import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { getEmployeeSkills } from "./initialSkills";
import { filterSkillsByCategory } from "./skillCategories";

interface EmployeeSkillState {
  level: string;
  requirement: string;
}

interface EmployeeSkillsMatrixState {
  currentStates: { [key: string]: EmployeeSkillState };
  originalStates: { [key: string]: EmployeeSkillState };
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

export const useSkillsMatrixStore = create<EmployeeSkillsMatrixState>((set) => ({
  currentStates: {},
  originalStates: {},
  hasChanges: false,

  setSkillState: (skillTitle, level, requirement) => {
    console.log('Setting employee skill state:', { skillTitle, level, requirement });
    set((state) => ({
      currentStates: {
        ...state.currentStates,
        [skillTitle]: { level, requirement },
      },
      hasChanges: true,
    }));
  },

  resetSkills: () => {
    console.log('Resetting employee skills');
    set(() => ({
      currentStates: {},
      originalStates: {},
      hasChanges: false,
    }));
  },

  initializeState: (skillTitle, level, requirement) => {
    console.log('Initializing employee skill state:', { skillTitle, level, requirement });
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
    console.log('Saving employee skill changes');
    set((state) => ({
      originalStates: { ...state.currentStates },
      hasChanges: false,
    }));
  },

  cancelChanges: () => {
    console.log('Canceling employee skill changes');
    set((state) => ({
      currentStates: { ...state.originalStates },
      hasChanges: false,
    }));
  },
}));

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