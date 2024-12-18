import { create } from 'zustand';
import { useState } from 'react';
import { getEmployeeSkills } from "./initialSkills";
import { roleSkills } from "../../skills/data/roleSkills";
import { UnifiedSkill } from "../../skills/types/SkillTypes";

interface SkillState {
  level: string;
  requirement: string;
}

interface SkillsMatrixState {
  currentStates: { [key: string]: SkillState };
  originalStates: { [key: string]: SkillState };
  hasChanges: boolean;
  setSkillState: (skillTitle: string, level: string, requirement: string) => void;
  initializeState: (skillTitle: string, level: string, requirement: string) => void;
  saveChanges: () => void;
  cancelChanges: () => void;
}

export const useSkillsMatrixStore = create<SkillsMatrixState>((set, get) => ({
  currentStates: {},
  originalStates: {},
  hasChanges: false,
  setSkillState: (skillTitle, level, requirement) => {
    console.log('Setting skill state:', { skillTitle, level, requirement });
    set((state) => ({
      currentStates: {
        ...state.currentStates,
        [skillTitle]: { level, requirement }
      },
      hasChanges: true
    }));
  },
  initializeState: (skillTitle, level, requirement) => {
    console.log('Initializing skill state:', { skillTitle, level, requirement });
    const state = get();
    if (!state.currentStates[skillTitle]) {
      set((state) => ({
        currentStates: {
          ...state.currentStates,
          [skillTitle]: { level, requirement }
        },
        originalStates: {
          ...state.originalStates,
          [skillTitle]: { level, requirement }
        }
      }));
    }
  },
  saveChanges: () => {
    console.log('Saving changes to skills matrix');
    const { currentStates } = get();
    set({ originalStates: { ...currentStates }, hasChanges: false });
  },
  cancelChanges: () => {
    console.log('Canceling changes to skills matrix');
    const { originalStates } = get();
    set({ currentStates: { ...originalStates }, hasChanges: false });
  }
}));

export const useSkillsMatrixState = (
  selectedCategory: string,
  selectedLevel: string,
  selectedInterest: string,
  matrixSearchSkills: string[]
) => {
  const { currentStates } = useSkillsMatrixStore();

  const getLevelPriority = (level: string) => {
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

  const filterAndSortSkills = (employeeId: string) => {
    const employeeSkills = getEmployeeSkills(employeeId);
    
    return filterSkillsByCategory(employeeSkills, selectedCategory)
      .filter(skill => {
        let matchesLevel = true;
        let matchesInterest = true;
        let matchesSearch = true;

        const currentSkillState = currentStates[skill.title];
        const skillLevel = (currentSkillState?.level || skill.level || '').toLowerCase();
        const requirement = (currentSkillState?.requirement || skill.requirement || '').toLowerCase();

        if (selectedLevel !== 'all') {
          matchesLevel = skillLevel === selectedLevel.toLowerCase();
        }

        if (selectedInterest !== 'all') {
          switch (selectedInterest.toLowerCase()) {
            case 'skill_goal':
              matchesInterest = requirement === 'required' || requirement === 'skill_goal';
              break;
            case 'not_interested':
              matchesInterest = requirement === 'not_interested';
              break;
            case 'unknown':
              matchesInterest = !requirement || requirement === 'unknown';
              break;
            default:
              matchesInterest = requirement === selectedInterest.toLowerCase();
          }
        }

        if (matrixSearchSkills.length > 0) {
          matchesSearch = matrixSearchSkills.some(term => 
            skill.title.toLowerCase().includes(term.toLowerCase())
          );
        }

        return matchesLevel && matchesInterest && matchesSearch;
      })
      .sort((a, b) => {
        const aRoleLevel = (a.roleLevel || 'unspecified').toLowerCase();
        const bRoleLevel = (b.roleLevel || 'unspecified').toLowerCase();
        
        const roleLevelDiff = getRoleLevelPriority(aRoleLevel) - getRoleLevelPriority(bRoleLevel);
        if (roleLevelDiff !== 0) return roleLevelDiff;

        const aState = currentStates[a.title];
        const bState = currentStates[b.title];
        
        const aLevel = (aState?.level || a.level || 'unspecified').toLowerCase();
        const bLevel = (bState?.level || b.level || 'unspecified').toLowerCase();
        
        const levelDiff = getLevelPriority(aLevel) - getLevelPriority(bLevel);
        if (levelDiff !== 0) return levelDiff;

        const aInterest = (aState?.requirement || a.requirement || 'unknown').toLowerCase();
        const bInterest = (bState?.requirement || b.requirement || 'unknown').toLowerCase();
        const interestDiff = getInterestPriority(aInterest) - getInterestPriority(bInterest);
        if (interestDiff !== 0) return interestDiff;

        return a.title.localeCompare(b.title);
      });
  };

  return { filterAndSortSkills };
};
