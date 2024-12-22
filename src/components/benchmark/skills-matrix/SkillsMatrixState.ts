import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UnifiedSkill, EmployeeSkillState, EmployeeSkillRequirement } from '../../../types/skillTypes';
import { useEmployeeStore } from '../../employee/store/employeeStore';
import { filterSkillsByCategory } from './skillCategories';

interface SkillsMatrixState {
  currentStates: { [key: string]: EmployeeSkillState };
  originalStates: { [key: string]: EmployeeSkillState };
  hasChanges: boolean;
  setSkillState: (skillName: string, level: string, requirement: string) => void;
  resetSkills: () => void;
  initializeState: (skillName: string, level: string, requirement: string) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
}

const convertRequirement = (requirement: string): EmployeeSkillRequirement => {
  if (requirement === 'required') return 'skill_goal';
  if (requirement === 'not-interested') return 'not_interested';
  return 'unknown';
};

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set) => ({
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setSkillState: (skillName, level, requirement) => {
        console.log('Setting skill state:', { skillName, level, requirement });
        const convertedRequirement = convertRequirement(requirement);
        
        set((state) => ({
          currentStates: {
            ...state.currentStates,
            [skillName]: { level, requirement: convertedRequirement },
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

      initializeState: (skillName, level, requirement) =>
        set((state) => {
          if (!state.currentStates[skillName]) {
            const convertedRequirement = convertRequirement(requirement);
            console.log('Initializing skill state:', { skillName, level, requirement: convertedRequirement });
            return {
              currentStates: {
                ...state.currentStates,
                [skillName]: { level, requirement: convertedRequirement },
              },
              originalStates: {
                ...state.originalStates,
                [skillName]: { level, requirement: convertedRequirement },
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

  const filterAndSortSkills = (employeeId: string) => {
    console.log('Filtering skills for employee:', employeeId);
    const employeeSkills = getEmployeeSkills(employeeId);
    let filteredSkills = [...employeeSkills];

    console.log('Initial filtering state:', {
      totalSkills: filteredSkills.length,
      selectedCategory,
      selectedLevel,
      selectedInterest
    });

    if (selectedCategory !== "all") {
      filteredSkills = filterSkillsByCategory(filteredSkills, selectedCategory);
    }

    if (selectedLevel !== "all") {
      filteredSkills = filteredSkills.filter((skill) => {
        const state = currentStates[skill.title];
        const matches = state?.level.toLowerCase() === selectedLevel.toLowerCase();
        console.log('Level filtering:', {
          skill: skill.title,
          currentLevel: state?.level,
          selectedLevel,
          matches
        });
        return matches;
      });
    }

    if (selectedInterest !== "all") {
      filteredSkills = filteredSkills.filter((skill) => {
        const state = currentStates[skill.title];
        if (!state) {
          console.log('No state found for skill:', skill.title);
          return false;
        }

        const matches = state.requirement === selectedInterest;

        console.log('Interest filtering:', {
          skill: skill.title,
          requirement: state.requirement,
          selectedInterest,
          matches
        });

        return matches;
      });
    }

    console.log('Final filtered skills:', {
      totalFiltered: filteredSkills.length,
      skills: filteredSkills.map(s => ({
        title: s.title,
        requirement: currentStates[s.title]?.requirement
      }))
    });

    return filteredSkills.sort((a, b) => a.title.localeCompare(b.title));
  };

  return {
    filterAndSortSkills,
  };
};

export const getEmployeeSkills = (employeeId: string): UnifiedSkill[] => {
  console.log('Getting skills for employee:', employeeId);
  return useEmployeeStore.getState().getEmployeeSkills(employeeId);
};