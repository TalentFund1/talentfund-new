import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { useEmployeeStore } from '../../employee/store/employeeStore';
import { filterSkillsByCategory } from '../skills-matrix/skillCategories';
import { EmployeeSkillAchievement, SkillLevel, SkillGoalStatus } from '../../employee/types/employeeSkillTypes';

interface SkillState {
  level: SkillLevel;
  goalStatus: SkillGoalStatus;
  lastUpdated: string;
}

interface SkillsMatrixState {
  currentStates: { [key: string]: SkillState };
  hasChanges: boolean;
  setSkillState: (skillTitle: string, level: SkillLevel, goalStatus: SkillGoalStatus) => void;
  resetSkills: () => void;
  initializeState: (skillTitle: string, level: SkillLevel, goalStatus: SkillGoalStatus) => void;
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
            [skillTitle]: { 
              level, 
              goalStatus,
              lastUpdated: new Date().toISOString()
            },
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
                [skillTitle]: { 
                  level, 
                  goalStatus: goalStatus || 'unknown',
                  lastUpdated: new Date().toISOString()
                },
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

    // Filter by category if not "all"
    if (selectedCategory !== "all") {
      filteredSkills = filterSkillsByCategory(filteredSkills, selectedCategory);
    }

    // Filter by level if not "all"
    if (selectedLevel !== "all") {
      filteredSkills = filteredSkills.filter((skill) => {
        return skill.level.toLowerCase() === selectedLevel.toLowerCase();
      });
    }

    // Filter by interest/goalStatus if not "all"
    if (selectedInterest !== "all") {
      filteredSkills = filteredSkills.filter((skill) => {
        if (!skill.goalStatus) return false;

        switch (selectedInterest.toLowerCase()) {
          case "skill_goal":
            return skill.goalStatus === "required" || skill.goalStatus === "skill_goal";
          case "not_interested":
            return skill.goalStatus === "not_interested";
          case "unknown":
            return !skill.goalStatus || skill.goalStatus === "unknown";
          default:
            return skill.goalStatus === selectedInterest.toLowerCase();
        }
      });
    }

    return filteredSkills.sort((a, b) => a.title.localeCompare(b.title));
  };

  return {
    filterAndSortSkills,
  };
};
