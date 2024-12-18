import { useState } from 'react';
import { filterSkillsByCategory } from "./skillCategories";
import { getEmployeeSkills } from "./initialSkills";
import { roleSkills } from "../../skills/data/roleSkills";
import { useSkillsMatrixStore } from "./SkillsMatrixState";
import { UnifiedSkill } from "../../skills/types/SkillTypes";

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

  const getRoleLevelPriority = (level: string) => {
    const priorities: { [key: string]: number } = {
      'advanced': 0,
      'intermediate': 1,
      'beginner': 2,
      'unspecified': 3
    };
    return priorities[level.toLowerCase()] ?? 3;
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