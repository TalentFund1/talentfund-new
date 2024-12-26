import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { EmployeeSkillAchievement } from "../../employee/types/employeeSkillTypes";
import { useSkillsMatrixStore } from "../skills-matrix/SkillsMatrixState";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";
import { benchmarkingService } from "../../../services/benchmarking";
import { SkillState } from "../../skills/competency/state/types";

const getSkillLevel = (state: string | SkillState | undefined): string => {
  if (!state) return 'unspecified';
  if (typeof state === 'string') return state;
  return state.level || 'unspecified';
};

const getSkillGoalStatus = (state: string | SkillState | undefined): string => {
  if (!state) return 'unknown';
  if (typeof state === 'string') return state;
  return state.goalStatus || 'unknown';
};

export const calculateMatchingSkills = (
  toggledRoleSkills: UnifiedSkill[],
  employeeSkills: EmployeeSkillAchievement[],
  comparisonLevel: string,
  selectedRole: string,
  track: string
) => {
  const { currentStates } = useSkillsMatrixStore.getState();
  const { getSkillCompetencyState } = useCompetencyStateReader();

  console.log('Calculating matching skills:', {
    toggledSkillCount: toggledRoleSkills.length,
    employeeSkillCount: employeeSkills.length,
    level: comparisonLevel,
    role: selectedRole,
    track
  });

  const matchingSkills = toggledRoleSkills.filter(roleSkill => {
    return employeeSkills.some(empSkill => empSkill.title === roleSkill.title);
  });

  const competencyMatchingSkills = matchingSkills.filter(skill => {
    const roleSkillState = getSkillCompetencyState(skill.title, comparisonLevel, selectedRole);
    if (!roleSkillState) return false;

    const employeeSkillLevel = getSkillLevel(currentStates[skill.title]?.level) || 
      employeeSkills.find(s => s.title === skill.title)?.level || 
      'unspecified';
    const roleSkillLevel = roleSkillState.level;

    console.log('Comparing skill levels:', {
      skill: skill.title,
      employeeLevel: employeeSkillLevel,
      roleLevel: roleSkillLevel
    });

    const comparison = benchmarkingService.compareSkillLevels(
      { title: skill.title, level: employeeSkillLevel },
      { title: skill.title, minimumLevel: roleSkillLevel }
    );

    return comparison.matchPercentage >= 100;
  });

  const skillGoalMatchingSkills = matchingSkills.filter(skill => {
    const skillState = currentStates[skill.title];
    if (!skillState) return false;
    
    const goalStatus = getSkillGoalStatus(skillState);
    return goalStatus === 'required' || goalStatus === 'skill_goal';
  });

  return {
    matchingSkills,
    competencyMatchingSkills,
    skillGoalMatchingSkills,
    totalToggledSkills: toggledRoleSkills.length
  };
};