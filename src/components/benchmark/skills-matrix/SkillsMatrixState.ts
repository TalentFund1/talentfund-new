import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { filterSkillsByCategory } from './skillCategories';
import { benchmarkingService } from '../../../services/benchmarking';
import { useEmployeeSkillsStore } from '../../employee/store/employeeSkillsStore';
import { EmployeeSkillData } from '../../employee/types/employeeSkillTypes';

interface SkillsMatrixState {
  getSkillState: (skillTitle: string, employeeId: string) => EmployeeSkillData;
}

export const useSkillsMatrixStore = create<SkillsMatrixState>()((set, get) => ({
  getSkillState: (skillTitle: string, employeeId: string) => {
    const employeeStore = useEmployeeSkillsStore.getState();
    const skillState = employeeStore.getSkillState(employeeId, skillTitle);
    
    console.log('Matrix getting skill state from employee store:', {
      employeeId,
      skillTitle,
      level: skillState.level,
      goalStatus: skillState.goalStatus
    });

    return skillState;
  }
}));

export const useSkillsMatrixState = (
  selectedCategory: string,
  selectedLevel: string,
  selectedInterest: string
) => {
  const { getSkillState } = useSkillsMatrixStore();

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