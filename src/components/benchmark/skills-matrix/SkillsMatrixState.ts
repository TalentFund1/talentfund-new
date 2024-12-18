import { create } from "zustand";
import { getEmployeeSkills } from "./initialSkills";
import { roleSkills } from "../../skills/data/roleSkills";
import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { filterSkillsByCategory } from "./skillCategories";

interface SkillState {
  level: string;
  requirement: string;
}

interface SkillsMatrixState {
  currentStates: { [key: string]: SkillState };
  setSkillState: (
    skillTitle: string,
    level: string,
    requirement: string
  ) => void;
  resetSkills: () => void;
}

export const useSkillsMatrixStore = create<SkillsMatrixState>((set) => ({
  currentStates: {},
  setSkillState: (skillTitle, level, requirement) =>
    set((state) => ({
      currentStates: {
        ...state.currentStates,
        [skillTitle]: { level, requirement },
      },
    })),
  resetSkills: () => set({ currentStates: {} }),
}));

const getLevelPriority = (level: string = 'unspecified') => {
  const priorities: { [key: string]: number } = {
    'advanced': 0,
    'intermediate': 1,
    'beginner': 2,
    'unspecified': 3
  };
  return priorities[level.toLowerCase()] ?? 3;
};

const getInterestPriority = (requirement: string) => {
  const priorities: { [key: string]: number } = {
    'required': 0,
    'skill_goal': 0,
    'preferred': 1,
    'not_interested': 2,
    'unknown': 3
  };
  return priorities[requirement.toLowerCase()] ?? 3;
};

export const useSkillsMatrixState = (
  selectedCategory: string,
  selectedLevel: string,
  selectedInterest: string,
  matrixSearchSkills: string[]
) => {
  const { currentStates } = useSkillsMatrixStore();

  const filterAndSortSkills = (employeeId: string) => {
    const employeeSkills = getEmployeeSkills(employeeId);
    let filteredSkills = [...employeeSkills];

    // Filter by category
    if (selectedCategory !== "all") {
      filteredSkills = filterSkillsByCategory(filteredSkills, selectedCategory, employeeId);
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
        return state?.requirement.toLowerCase() === selectedInterest.toLowerCase();
      });
    }

    // Filter by search
    if (matrixSearchSkills.length > 0) {
      filteredSkills = filteredSkills.filter((skill) =>
        matrixSearchSkills.includes(skill.title)
      );
    }

    // Sort skills
    return filteredSkills.sort((a, b) => {
      const stateA = currentStates[a.title];
      const stateB = currentStates[b.title];

      // Sort by level first
      const levelDiff = getLevelPriority(stateA?.level) - getLevelPriority(stateB?.level);
      if (levelDiff !== 0) return levelDiff;

      // Then by interest/requirement
      const interestDiff = getInterestPriority(stateA?.requirement) - getInterestPriority(stateB?.requirement);
      if (interestDiff !== 0) return interestDiff;

      // Finally alphabetically
      return a.title.localeCompare(b.title);
    });
  };

  return { filterAndSortSkills };
};