import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UnifiedSkill, SkillRequirement } from '../../skills/types/SkillTypes';
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';
import { filterSkillsByCategory } from '../skills-matrix/skillCategories';
import { useEmployeeStore } from '../../employee/store/employeeStore';

interface SkillState {
  level: string;
  requirement: SkillRequirement;
}

interface SkillsMatrixState {
  currentStates: { [key: string]: SkillState };
  originalStates: { [key: string]: SkillState };
  hasChanges: boolean;
  setSkillState: (skillTitle: string, level: string, requirement: SkillRequirement) => void;
  resetSkills: () => void;
  initializeState: (skillTitle: string, level: string, requirement: SkillRequirement) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
}

const defaultSkillState: SkillState = {
  level: 'unspecified',
  requirement: 'preferred'
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

  const filterAndSortSkills = (employeeId: string) => {
    console.log('Filtering skills for employee:', employeeId);
    
    // Get employee's skills from the employee store
    const employeeSkills = useEmployeeStore.getState().getEmployeeSkills(employeeId);
    console.log('Employee skills:', employeeSkills);

    // Map employee skills to include universal skill data and ensure required properties
    let filteredSkills = employeeSkills.map(skill => {
      const universalSkillData = getUnifiedSkillData(skill.title);
      const currentState = currentStates[skill.title];
      
      const mappedSkill = {
        ...universalSkillData,
        level: currentState?.level || skill.level || 'unspecified',
        requirement: (currentState?.requirement || skill.requirement || 'preferred') as SkillRequirement,
        roleLevel: null as any, // explicitly typed as any to match expected type
        isCompanySkill: false,
        id: universalSkillData.id,
        title: universalSkillData.title,
        subcategory: universalSkillData.subcategory,
        category: universalSkillData.category,
        businessCategory: universalSkillData.businessCategory,
        weight: universalSkillData.weight,
        growth: universalSkillData.growth,
        salary: universalSkillData.salary,
        confidence: universalSkillData.confidence,
        benchmarks: universalSkillData.benchmarks
      };

      return mappedSkill;
    });

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

export const getEmployeeSkills = (employeeId: string) => {
  console.log('Getting skills for employee:', employeeId);
  const employeeSkills = useEmployeeStore.getState().getEmployeeSkills(employeeId);
  const employeeSkillStates = useSkillsMatrixStore.getState().currentStates;
  
  return employeeSkills.map(skill => {
    const universalSkillData = getUnifiedSkillData(skill.title);
    const currentState = employeeSkillStates[skill.title];
    
    return {
      ...universalSkillData,
      level: currentState?.level || skill.level || 'unspecified',
      requirement: (currentState?.requirement || skill.requirement || 'preferred') as SkillRequirement,
      roleLevel: null as any,
      isCompanySkill: false
    };
  });
};
