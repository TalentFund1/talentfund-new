import { create } from "zustand";
import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { filterSkillsByCategory } from "./skillCategories";
import { getEmployeeSkills } from "./initialSkills";

interface SkillState {
  level: string;
  requirement: string;
}

interface EmployeeSkillState {
  [skillTitle: string]: SkillState;
}

interface SkillsMatrixState {
  currentStates: { [employeeId: string]: EmployeeSkillState };
  originalStates: { [employeeId: string]: EmployeeSkillState };
  hasChanges: boolean;
  setSkillState: (employeeId: string, skillTitle: string, level: string, requirement: string) => void;
  resetSkills: (employeeId: string) => void;
  initializeState: (employeeId: string, level: string, requirement: string) => void;
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

  setSkillState: (employeeId, skillTitle, level, requirement) =>
    set((state) => {
      console.log('Setting skill state:', { employeeId, skillTitle, level, requirement });
      
      const newState = {
        currentStates: {
          ...state.currentStates,
          [employeeId]: {
            ...state.currentStates[employeeId],
            [skillTitle]: { level, requirement },
          },
        },
        hasChanges: true,
      };

      console.log('Updated state:', newState);
      return newState;
    }),

  resetSkills: (employeeId) =>
    set((state) => {
      console.log('Resetting skills for employee:', employeeId);
      
      const employeeSkills = getEmployeeSkills(employeeId);
      const resetState: EmployeeSkillState = {};

      employeeSkills.forEach(skill => {
        resetState[skill.title] = {
          level: 'unspecified',
          requirement: 'preferred'
        };
      });

      return {
        currentStates: {
          ...state.currentStates,
          [employeeId]: resetState
        },
        hasChanges: true,
      };
    }),

  initializeState: (employeeId, level, requirement) =>
    set((state) => {
      if (!state.currentStates[employeeId]) {
        console.log('Initializing state for employee:', employeeId);
        
        const employeeSkills = getEmployeeSkills(employeeId);
        const initialState: EmployeeSkillState = {};

        employeeSkills.forEach(skill => {
          initialState[skill.title] = { level, requirement };
        });

        return {
          currentStates: {
            ...state.currentStates,
            [employeeId]: initialState
          },
          originalStates: {
            ...state.originalStates,
            [employeeId]: initialState
          }
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

  const filterAndSortSkills = (employeeId: string) => {
    const employeeSkills = getEmployeeSkills(employeeId);
    let filteredSkills = [...employeeSkills];

    if (selectedCategory !== "all") {
      filteredSkills = filterSkillsByCategory(filteredSkills, selectedCategory);
    }

    if (selectedLevel !== "all") {
      filteredSkills = filteredSkills.filter((skill) => {
        const state = currentStates[employeeId]?.[skill.title];
        return state?.level.toLowerCase() === selectedLevel.toLowerCase();
      });
    }

    if (selectedInterest !== "all") {
      filteredSkills = filteredSkills.filter((skill) => {
        const state = currentStates[employeeId]?.[skill.title];
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
      const stateA = currentStates[employeeId]?.[a.title];
      const stateB = currentStates[employeeId]?.[b.title];

      const levelDiff = getLevelPriority(stateA?.level) - getLevelPriority(stateB?.level);
      if (levelDiff !== 0) return levelDiff;

      return a.title.localeCompare(b.title);
    });
  };

  return {
    filterAndSortSkills,
  };
};