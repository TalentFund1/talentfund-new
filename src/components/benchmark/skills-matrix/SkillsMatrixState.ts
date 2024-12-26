import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { filterSkillsByCategory } from './skillCategories';
import { benchmarkingService } from '../../../services/benchmarking';
import { useEmployeeSkillsStore } from '../../employee/store/employeeSkillsStore';
import { EmployeeSkillState } from '../../employee/types/employeeSkillTypes';

interface SkillsMatrixState {
  getSkillState: (skillTitle: string, employeeId: string) => EmployeeSkillState;
  hasChanges: boolean;
  saveChanges: () => void;
  cancelChanges: () => void;
  initializeState: (skillTitle: string, employeeId: string) => void;
}

export const useSkillsMatrixStore = create<SkillsMatrixState>()(
  persist(
    (set) => ({
      hasChanges: false,

      getSkillState: (skillTitle: string, employeeId: string) => {
        const employeeStore = useEmployeeSkillsStore.getState();
        const skillState = employeeStore.getSkillState(employeeId, skillTitle);
        
        console.log('Matrix getting skill state:', {
          employeeId,
          skillTitle,
          level: skillState.level,
          goalStatus: skillState.goalStatus
        });

        return skillState;
      },

      initializeState: (skillTitle: string, employeeId: string) => {
        const employeeStore = useEmployeeSkillsStore.getState();
        employeeStore.initializeEmployeeSkills(employeeId);
        
        console.log('Matrix initialized skill state:', {
          employeeId,
          skillTitle
        });
      },

      saveChanges: () => {
        console.log('Matrix saving changes');
        set({ hasChanges: false });
      },

      cancelChanges: () => {
        console.log('Matrix canceling changes');
        set({ hasChanges: false });
      }
    }),
    {
      name: 'skills-matrix-storage',
      version: 2,
      partialize: (state) => ({
        hasChanges: state.hasChanges
      })
    }
  )
);

export const useSkillsMatrixState = (
  selectedCategory: string,
  selectedLevel: string,
  selectedInterest: string
) => {
  const { getSkillState } = useSkillsMatrixStore();

  const filterAndSortSkills = (skills: UnifiedSkill[], employeeId: string) => {
    console.log('Filtering skills:', { 
      totalSkills: skills.length,
      selectedCategory,
      selectedLevel,
      selectedInterest,
      employeeId
    });

    let filteredSkills = [...skills];

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