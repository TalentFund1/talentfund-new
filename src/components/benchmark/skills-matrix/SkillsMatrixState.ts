import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SkillRequirement } from '../../../skills/types/SkillTypes';
import { filterSkillsByCategory } from './skillCategories';
import { useEmployeeStore } from '../../../employee/store/employeeStore';
import { mapSkillWithState } from './utils/skillMapping';
import { SkillsMatrixState, MappedSkill } from './types/skillMatrixTypes';

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set) => ({
      currentStates: {},
      originalStates: {},
      hasChanges: false,

      setSkillState: (skillTitle: string, level: string, requirement: SkillRequirement, employeeId?: string) => {
        console.log('Setting skill state:', { skillTitle, level, requirement, employeeId });
        const stateKey = employeeId ? `${employeeId}_${skillTitle}` : skillTitle;
        
        set((state) => ({
          currentStates: {
            ...state.currentStates,
            [stateKey]: { level, requirement },
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

      initializeState: (skillTitle: string, level: string, requirement: SkillRequirement, employeeId?: string) =>
        set((state) => {
          const stateKey = employeeId ? `${employeeId}_${skillTitle}` : skillTitle;
          
          if (!state.currentStates[stateKey]) {
            console.log('Initializing skill state:', { skillTitle, level, requirement, employeeId });
            return {
              currentStates: {
                ...state.currentStates,
                [stateKey]: { level, requirement },
              },
              originalStates: {
                ...state.originalStates,
                [stateKey]: { level, requirement },
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
      version: 3, // Increment version to ensure clean state
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

  const getSkillState = (skillTitle: string, employeeId: string) => {
    const stateKey = `${employeeId}_${skillTitle}`;
    return currentStates[stateKey];
  };

  const filterAndSortSkills = (employeeId: string): MappedSkill[] => {
    console.log('Filtering skills for employee:', employeeId);
    
    const employeeSkills = useEmployeeStore.getState().getEmployeeSkills(employeeId);
    console.log('Employee skills:', employeeSkills);

    let filteredSkills = employeeSkills.map(skill => {
      const skillState = getSkillState(skill.title, employeeId);
      return {
        ...skill,
        requirement: (skillState?.requirement || skill.requirement || 'preferred') as SkillRequirement,
        roleLevel: null,
        isCompanySkill: false,
        level: skillState?.level || skill.level || 'unspecified',
        id: skill.id,
        title: skill.title,
        subcategory: skill.subcategory,
        category: skill.category,
        businessCategory: skill.businessCategory,
        weight: skill.weight,
        growth: skill.growth,
        salary: skill.salary,
        confidence: skill.confidence,
        benchmarks: skill.benchmarks
      } as MappedSkill;
    });

    if (selectedCategory !== "all") {
      filteredSkills = filterSkillsByCategory(filteredSkills, selectedCategory);
    }

    if (selectedLevel !== "all") {
      filteredSkills = filteredSkills.filter((skill) => {
        const skillState = getSkillState(skill.title, employeeId);
        return skillState?.level.toLowerCase() === selectedLevel.toLowerCase();
      });
    }

    if (selectedInterest !== "all") {
      filteredSkills = filteredSkills.filter((skill) => {
        const skillState = getSkillState(skill.title, employeeId);
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

export const getEmployeeSkills = (employeeId: string): MappedSkill[] => {
  console.log('Getting skills for employee:', employeeId);
  const employeeSkills = useEmployeeStore.getState().getEmployeeSkills(employeeId);
  const employeeSkillStates = useSkillsMatrixStore.getState().currentStates;
  
  return employeeSkills.map(skill => {
    const stateKey = `${employeeId}_${skill.title}`;
    const skillState = employeeSkillStates[stateKey];
    
    return {
      ...skill,
      requirement: (skillState?.requirement || skill.requirement || 'preferred') as SkillRequirement,
      roleLevel: null,
      isCompanySkill: false,
      level: skillState?.level || skill.level || 'unspecified',
      id: skill.id,
      title: skill.title,
      subcategory: skill.subcategory,
      category: skill.category,
      businessCategory: skill.businessCategory,
      weight: skill.weight,
      growth: skill.growth,
      salary: skill.salary,
      confidence: skill.confidence,
      benchmarks: skill.benchmarks
    } as MappedSkill;
  });
};