import { create } from "zustand";
import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { getEmployeeSkills } from "./initialSkills";
import { filterSkillsByCategory } from "./skillCategories";

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

export const useSkillsMatrixStore = create<SkillsMatrixState>((set) => ({
  currentStates: {},
  originalStates: {},
  hasChanges: false,

  setSkillState: (skillTitle, level, requirement) =>
    set((state) => ({
      currentStates: {
        ...state.currentStates,
        [skillTitle]: { level, requirement },
      },
      hasChanges: true,
    })),

  resetSkills: () =>
    set(() => ({
      currentStates: {},
      originalStates: {},
      hasChanges: false,
    })),

  initializeState: (skillTitle, level, requirement) =>
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
    }),

  saveChanges: () =>
    set((state) => ({
      originalStates: { ...state.currentStates },
      hasChanges: false,
    })),

  cancelChanges: () =>
    set((state) => ({
      currentStates: { ...state.originalStates },
      hasChanges: false,
    })),
}));

export const useSkillsMatrixState = (
  selectedCategory: string,
  selectedLevel: string,
  selectedInterest: string
) => {
  const { currentStates } = useSkillsMatrixStore();

  const filterAndSortSkills = (employeeId: string, roleId: string = "123") => {
    const employeeSkills = getEmployeeSkills(employeeId);
    let filteredSkills = [...employeeSkills];

    console.log('Filtering skills with:', {
      selectedCategory,
      selectedLevel,
      selectedInterest,
      totalSkills: filteredSkills.length
    });

    // Filter by category
    if (selectedCategory !== "all") {
      filteredSkills = filterSkillsByCategory(filteredSkills, selectedCategory, roleId);
      console.log('After category filtering:', {
        category: selectedCategory,
        remainingSkills: filteredSkills.length
      });
    }

    // Filter by level
    if (selectedLevel !== "all") {
      filteredSkills = filteredSkills.filter((skill) => {
        const state = currentStates[skill.title];
        return state?.level.toLowerCase() === selectedLevel.toLowerCase();
      });
    }

    // Filter by interest/requirement
    if (selectedInterest !== "all") {
      filteredSkills = filteredSkills.filter((skill) => {
        const state = currentStates[skill.title];
        if (!state) return false;

        switch (selectedInterest.toLowerCase()) {
          case "skill_goal":
            return (
              state.requirement === "required" ||
              state.requirement === "skill_goal"
            );
          case "not_interested":
            return state.requirement === "not_interested";
          case "unknown":
            return !state.requirement || state.requirement === "unknown";
          default:
            return state.requirement === selectedInterest.toLowerCase();
        }
      });
    }

    // Sort skills
    return filteredSkills.sort((a, b) => {
      const stateA = currentStates[a.title];
      const stateB = currentStates[b.title];

      // First by level
      const levelDiff = getLevelPriority(stateA?.level) - getLevelPriority(stateB?.level);
      if (levelDiff !== 0) return levelDiff;

      // Finally alphabetically
      return a.title.localeCompare(b.title);
    });
  };

  return {
    filterAndSortSkills,
  };
};