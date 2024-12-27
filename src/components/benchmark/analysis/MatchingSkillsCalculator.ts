import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { useCompetencyStateReader } from '../../skills/competency/CompetencyStateReader';
import { benchmarkingService } from '../../../services/benchmarking';
import { EmployeeSkillData } from '../../employee/types/employeeSkillTypes';

interface MatchingSkillsResult {
  matchingSkills: UnifiedSkill[];
  competencyMatchingSkills: UnifiedSkill[];
  skillGoalMatchingSkills: UnifiedSkill[];
  totalToggledSkills: number;
}

const getLevelValue = (level: string): number => {
  switch (level?.toLowerCase()) {
    case 'advanced': return 3;
    case 'intermediate': return 2;
    case 'beginner': return 1;
    case 'unspecified': return 0;
    default: return 0;
  }
};

export const calculateMatchingSkills = (
  toggledRoleSkills: UnifiedSkill[],
  employeeSkills: UnifiedSkill[],
  comparisonLevel: string,
  selectedRole: string,
  track: string,
  getSkillState: (skillTitle: string, employeeId: string) => EmployeeSkillData,
  employeeId: string
): MatchingSkillsResult => {
  const { getSkillCompetencyState } = useCompetencyStateReader();

  console.log('Calculating matching skills:', {
    toggledCount: toggledRoleSkills.length,
    employeeSkillsCount: employeeSkills.length,
    level: comparisonLevel,
    role: selectedRole,
    track
  });

  const matchingSkills = toggledRoleSkills.filter(roleSkill => {
    const employeeSkill = employeeSkills.find(empSkill => empSkill.title === roleSkill.title);
    return employeeSkill !== undefined;
  });

  const competencyMatchingSkills = matchingSkills.filter(skill => {
    const roleSkillState = getSkillCompetencyState(skill.title, comparisonLevel, selectedRole);
    if (!roleSkillState) return false;

    const skillState = getSkillState(skill.title, employeeId);
    const employeeSkillLevel = skillState?.level || 'unspecified';
    const roleSkillLevel = roleSkillState.level;

    console.log('Comparing competency levels:', {
      skill: skill.title,
      employeeLevel: employeeSkillLevel,
      roleLevel: roleSkillLevel,
      track
    });

    // If role level is unspecified, any employee level is considered a match
    if (roleSkillLevel === 'unspecified') return true;

    const employeeLevelValue = getLevelValue(employeeSkillLevel);
    const roleLevelValue = getLevelValue(roleSkillLevel);

    // Employee level should be equal to or higher than role level
    return employeeLevelValue >= roleLevelValue;
  });

  const skillGoalMatchingSkills = matchingSkills.filter(skill => {
    const skillState = getSkillState(skill.title, employeeId);
    if (!skillState) return false;
    return skillState.goalStatus === 'required' || skillState.goalStatus === 'skill_goal';
  });

  return {
    matchingSkills,
    competencyMatchingSkills,
    skillGoalMatchingSkills,
    totalToggledSkills: toggledRoleSkills.length
  };
};