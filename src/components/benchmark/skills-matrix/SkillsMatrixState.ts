import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SkillRequirement } from '../../skills/types/SkillTypes';
import { filterSkillsByCategory } from './skillCategories';
import { useEmployeeStore } from '../../employee/store/employeeStore';
import { mapSkillWithState } from './utils/skillMapping';
import { SkillsMatrixState, MappedSkill } from './types/skillMatrixTypes';

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

      resetSkills: () =>
        set(() => ({
          currentStates: {},
          originalStates: {},
          hasChanges: false,
        })),

      initializeState: (skillTitle, level, requirement) =>
        set((state) => {
          if (!state.currentStates[skillTitle]) {
            console.log('Initializing skill state:', { skillTitle, level, requirement });
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
    }),
    {
      name: 'skills-matrix-storage',
      version: 1,
      partialize: (state) => ({
        currentStates: state.currentStates,
        originalStates: state.originalStates,
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

  const filterAndSortSkills = (employeeId: string): MappedSkill[] => {
    console.log('Filtering skills for employee:', employeeId);
    
    // Get employee's skills from the employee store
    const employeeSkills = useEmployeeStore.getState().getEmployeeSkills(employeeId);
    console.log('Employee skills:', employeeSkills);

    // Map employee skills to include universal skill data and ensure required properties
    let filteredSkills = employeeSkills.map(skill => 
      mapSkillWithState(skill, currentStates[skill.title])
    );

    // Filter by category if not "all"
    if (selectedCategory !== "all") {
      filteredSkills = filterSkillsByCategory(filteredSkills, selectedCategory);
    }

    // Filter by level if not "all"
    if (selectedLevel !== "all") {
      filteredSkills = filteredSkills.filter((skill) => {
        const state = currentStates[skill.title];
        return state?.level.toLowerCase() === selectedLevel.toLowerCase();
      });
    }

    // Filter by interest/requirement if not "all"
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

    console.log('Filtered skills:', {
      total: filteredSkills.length,
      skills: filteredSkills.map(s => ({
        title: s.title,
        level: s.level,
        requirement: s.requirement
      }))
    });

    return filteredSkills.sort((a, b) => a.title.localeCompare(b.title));
  };

  return {
    filterAndSortSkills,
  };
};

export const getEmployeeSkills = (employeeId: string): MappedSkill[] => {
  console.log('Getting skills for employee:', employeeId);
  const employeeSkills = useEmployeeStore.getState().getEmployeeSkills(employeeId);
  const employeeSkillStates = useSkillsMatrixStore.getState().currentStates;
  
  return employeeSkills.map(skill => 
    mapSkillWithState(skill, employeeSkillStates[skill.title])
  );
};