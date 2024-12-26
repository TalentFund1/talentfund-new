import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { filterSkillsByCategory } from '../skills-matrix/skillCategories';
import { benchmarkingService } from '../../../services/benchmarking';
import { useEmployeeSkillsStore } from '../../employee/store/employeeSkillsStore';

interface SkillState {
  level: string;
  goalStatus: string;
  lastUpdated: string;
}

interface SkillsMatrixState {
  hasChanges: boolean;
  getSkillState: (skillTitle: string, employeeId: string) => SkillState;
  resetSkills: () => void;
  saveChanges: () => void;
  cancelChanges: () => void;
}

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set) => ({
      hasChanges: false,

      getSkillState: (skillTitle: string, employeeId: string) => {
        const employeeStore = useEmployeeSkillsStore.getState();
        const skillState = employeeStore.getSkillState(employeeId, skillTitle);
        
        console.log('Matrix getting skill state from employee store:', {
          employeeId,
          skillTitle,
          level: skillState.level,
          goalStatus: skillState.goalStatus
        });

        return {
          level: skillState.level,
          goalStatus: skillState.goalStatus,
          lastUpdated: skillState.lastUpdated
        };
      },

      resetSkills: () =>
        set(() => ({
          hasChanges: false,
        })),

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
        hasChanges: state.hasChanges,
      }),
    }
  )
);

export const useSkillsMatrixState = (
  selectedCategory: string,
  selectedLevel: string,
  selectedInterest: string
) => {
  const { getSkillState } = useSkillsMatrixStore();
  const employeeStore = useEmployeeSkillsStore.getState();

  const filterAndSortSkills = (skills: UnifiedSkill[]) => {
    console.log('Filtering skills:', { 
      totalSkills: skills.length,
      selectedCategory,
      selectedLevel,
      selectedInterest 
    });

    let filteredSkills = [...skills];

    if (selectedCategory !== "all") {
      filteredSkills = filterSkillsByCategory(filteredSkills, selectedCategory);
    }

    if (selectedLevel !== "all") {
      filteredSkills = filteredSkills.filter((skill) => {
        const skillState = getSkillState(skill.title, skill.employeeId || '');
        return skillState?.level.toLowerCase() === selectedLevel.toLowerCase();
      });
    }

    if (selectedInterest !== "all") {
      filteredSkills = filteredSkills.filter((skill) => {
        const skillState = getSkillState(skill.title, skill.employeeId || '');
        if (!skillState?.goalStatus) return false;

        return benchmarkingService.matchesInterestFilter(skillState.goalStatus, selectedInterest);
      });
    }

    return filteredSkills.sort((a, b) => a.title.localeCompare(b.title));
  };

  return {
    filterAndSortSkills,
  };
};