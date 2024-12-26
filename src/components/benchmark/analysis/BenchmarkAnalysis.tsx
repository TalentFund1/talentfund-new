import { useState, useEffect } from "react";
import { useSkillsMatrixStore } from "../skills-matrix/SkillsMatrixState";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { BenchmarkAnalysisCard } from "./BenchmarkAnalysisCard";
import { roleSkills } from "../../skills/data/roleSkills";
import { useToggledSkills } from "../../skills/context/ToggledSkillsContext";
import { getEmployeeSkills } from "../skills-matrix/initialSkills";
import { useTrack } from "../../skills/context/TrackContext";
import { SkillState } from "../../skills/competency/state/types";

interface BenchmarkAnalysisProps {
  selectedRole: string;
  roleLevel: string;
  employeeId: string;
}

const getLevelPriority = (level: string = 'unspecified') => {
  const priorities: { [key: string]: number } = {
    'advanced': 0,
    'intermediate': 1,
    'beginner': 2,
    'unspecified': 3
  };
  return priorities[level.toLowerCase()] ?? 3;
};

const getSkillGoalPriority = (requirement: string = 'unknown') => {
  const priorities: { [key: string]: number } = {
    'required': 0,
    'skill_goal': 1,
    'preferred': 2,
    'not_interested': 3,
    'unknown': 4
  };
  return priorities[requirement.toLowerCase()] ?? 4;
};

export const BenchmarkAnalysis = ({ selectedRole, roleLevel, employeeId }: BenchmarkAnalysisProps) => {
  const { currentStates } = useSkillsMatrixStore();
  const { getSkillCompetencyState } = useCompetencyStateReader();
  const { toggledSkills } = useToggledSkills();
  const { getTrackForRole } = useTrack();
  
  console.log('BenchmarkAnalysis - Selected Role Analysis:', {
    selectedRole,
    roleLevel,
    employeeId,
    track: getTrackForRole(selectedRole),
    currentStates
  });

  const employeeSkills = getEmployeeSkills(employeeId);
  console.log('Employee skills loaded for comparison:', employeeSkills);

  const currentRoleSkills = roleSkills[selectedRole as keyof typeof roleSkills];
  if (!currentRoleSkills) {
    console.error('No role skills found for selected role:', selectedRole);
    return null;
  }

  const allRoleSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  const processedSkills = allRoleSkills
    .filter(skill => toggledSkills.has(skill.title))
    .map(skill => {
      const employeeSkill = employeeSkills.find(empSkill => empSkill.title === skill.title);
      const roleSkillState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase(), selectedRole);
      
      const getSkillLevel = (state: SkillState | string | undefined): string => {
        if (typeof state === 'string') return state;
        if (state && typeof state === 'object' && 'level' in state) return state.level;
        return 'unspecified';
      };

      const getGoalStatus = (state: SkillState | string | undefined): string => {
        if (typeof state === 'string') return state;
        if (state && typeof state === 'object' && 'required' in state) return state.required;
        return 'unknown';
      };
      
      return {
        ...skill,
        roleLevel: getSkillLevel(roleSkillState?.level),
        employeeLevel: getSkillLevel(currentStates[skill.title]?.level) || employeeSkill?.level || 'unspecified',
        goalStatus: getGoalStatus(currentStates[skill.title]?.goalStatus) || 'unknown'
      };
    })
    .sort((a, b) => {
      const aRoleLevel = a.roleLevel;
      const bRoleLevel = b.roleLevel;
      
      const roleLevelDiff = getLevelPriority(aRoleLevel) - getLevelPriority(bRoleLevel);
      if (roleLevelDiff !== 0) return roleLevelDiff;

      const employeeLevelDiff = getLevelPriority(a.employeeLevel) - getLevelPriority(b.employeeLevel);
      if (employeeLevelDiff !== 0) return employeeLevelDiff;

      const requirementDiff = getSkillGoalPriority(a.goalStatus) - getSkillGoalPriority(b.goalStatus);
      if (requirementDiff !== 0) return requirementDiff;

      return a.title.localeCompare(b.title);
    });

  const totalToggledSkills = processedSkills.length;

  const matchingSkills = processedSkills.filter(skill => {
    const employeeSkill = employeeSkills.find(empSkill => empSkill.title === skill.title);
    return employeeSkill !== undefined;
  });

  const competencyMatchingSkills = matchingSkills.filter(skill => {
    const roleSkillState = getSkillCompetencyState(skill.title, roleLevel.toLowerCase(), selectedRole);
    if (!roleSkillState) return false;

    const employeeSkillLevel = currentStates[skill.title]?.level || skill.level || 'unspecified';
    const roleSkillLevel = roleSkillState.level;

    console.log('Comparing skill levels:', {
      skill: skill.title,
      employeeLevel: employeeSkillLevel,
      roleLevel: roleSkillLevel
    });

    const employeePriority = getLevelPriority(typeof employeeSkillLevel === 'string' ? employeeSkillLevel : employeeSkillLevel.level);
    const rolePriority = getLevelPriority(typeof roleSkillLevel === 'string' ? roleSkillLevel : roleSkillLevel.level);

    return employeePriority <= rolePriority;
  });

  const skillGoalMatchingSkills = matchingSkills.filter(skill => {
    const skillState = currentStates[skill.title];
    if (!skillState) return false;
    
    const goalStatus = typeof skillState.goalStatus === 'string' ? 
      skillState.goalStatus : 
      skillState.goalStatus?.goalStatus || 'unknown';
      
    return goalStatus === 'required' || goalStatus === 'skill_goal';
  });

  console.log('Selected role match calculations:', {
    roleId: selectedRole,
    skillMatches: matchingSkills.length,
    competencyMatches: competencyMatchingSkills.length,
    skillGoalMatches: skillGoalMatchingSkills.length,
    totalSkills: totalToggledSkills
  });

  return (
    <BenchmarkAnalysisCard 
      skillMatch={{
        current: matchingSkills.length,
        total: totalToggledSkills
      }}
      competencyMatch={{
        current: competencyMatchingSkills.length,
        total: totalToggledSkills
      }}
      skillGoals={{
        current: skillGoalMatchingSkills.length,
        total: totalToggledSkills
      }}
    />
  );
};