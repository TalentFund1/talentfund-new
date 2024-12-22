import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { filterSkillsByCategory } from './skillCategories';
import { SkillRequirement, EmployeeSkill } from '../../../skills/types/SkillTypes';
import { SkillsMatrixState } from './types/skillMatrixTypes';
import { useEmployeeStore } from '../../../components/employee/store/employeeStore';

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set) => ({
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setSkillState: (skillTitle: string, level: string, requirement: SkillRequirement) => {
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

      initializeState: (skillTitle: string, level: string, requirement: SkillRequirement) =>
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
      version: 4,
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

  const getSkillState = (skillTitle: string) => {
    return currentStates[skillTitle];
  };

  const filterAndSortSkills = (employeeId: string): EmployeeSkill[] => {
    console.log('Filtering skills for employee:', employeeId);
    
    const employeeSkills = useEmployeeStore.getState().getEmployeeSkills(employeeId);
    console.log('Employee skills:', employeeSkills);

    let filteredSkills = employeeSkills.map((skill): EmployeeSkill => {
      const skillState = getSkillState(skill.title);
      return {
        ...skill,
        requirement: skillState?.requirement || 'preferred',
        level: skillState?.level || skill.level || 'unspecified',
      };
    });

    if (selectedCategory !== "all") {
      filteredSkills = filterSkillsByCategory(filteredSkills, selectedCategory);
    }

    if (selectedLevel !== "all") {
      filteredSkills = filteredSkills.filter((skill) => {
        const skillState = getSkillState(skill.title);
        return skillState?.level.toLowerCase() === selectedLevel.toLowerCase();
      });
    }

    if (selectedInterest !== "all") {
      filteredSkills = filteredSkills.filter((skill) => {
        const skillState = getSkillState(skill.title);
        if (!skillState) return false;

        switch (selectedInterest.toLowerCase()) {
          case "skill_goal":
            return skillState.requirement === "required" || skillState.requirement === "skill_goal";
          case "not_interested":
            return skillState.requirement === "not_interested";
          case "unknown":
            return !skillState.requirement || skillState.requirement === "unknown";
          default:
            return skillState.requirement === selectedInterest.toLowerCase();
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

export const getEmployeeSkills = (employeeId: string): EmployeeSkill[] => {
  console.log('Getting skills for employee:', employeeId);
  const employeeSkills = useEmployeeStore.getState().getEmployeeSkills(employeeId);
  const employeeSkillStates = useSkillsMatrixStore.getState().currentStates;
  
  return employeeSkills.map((skill): EmployeeSkill => {
    const skillState = employeeSkillStates[skill.title];
    
    return {
      ...skill,
      requirement: skillState?.requirement || 'preferred',
      level: skillState?.level || skill.level || 'unspecified',
    };
  });
};