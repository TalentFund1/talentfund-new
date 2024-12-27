import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { EmployeeSkillState } from '../../employee/types/employeeSkillTypes';
import { StaticCompetencyReader } from '../../skills/competency/state/StaticCompetencyReader';
import { compareSkillLevels } from '../../skills/competency/utils/competencyUtils';

interface MatchingSkillsResult {
  matchingSkills: UnifiedSkill[];
  competencyMatchingSkills: UnifiedSkill[];
  skillGoalMatchingSkills: UnifiedSkill[];
  totalToggledSkills: number;
}

export const calculateMatchingSkills = (
  toggledRoleSkills: UnifiedSkill[],
  employeeSkills: UnifiedSkill[],
  comparisonLevel: string,
  selectedRole: string,
  track: string,
  getSkillState: (skillTitle: string, employeeId: string) => EmployeeSkillState,
  employeeId: string
): MatchingSkillsResult => {
  console.log('Calculating matching skills:', {
    toggledSkillCount: toggledRoleSkills.length,
    employeeSkillCount: employeeSkills.length,
    comparisonLevel,
    selectedRole,
    track
  });

  const matchingSkills = toggledRoleSkills.filter(skill => {
    return employeeSkills.some(empSkill => empSkill.title === skill.title);
  });

  const competencyMatchingSkills = toggledRoleSkills.filter(skill => {
    const employeeSkillLevel = getSkillState(skill.title, employeeId)?.level || 'unspecified';
    const roleSkillState = StaticCompetencyReader.getSkillCompetencyState(skill.title, comparisonLevel, selectedRole);
    const roleSkillLevel = roleSkillState?.level || 'unspecified';

    console.log('Comparing skill levels:', {
      skill: skill.title,
      employeeLevel: employeeSkillLevel,
      roleLevel: roleSkillLevel
    });

    return compareSkillLevels(employeeSkillLevel, roleSkillLevel);
  });

  const skillGoalMatchingSkills = toggledRoleSkills.filter(skill => {
    const skillState = getSkillState(skill.title, employeeId);
    return skillState?.goalStatus === 'skill_goal' || skillState?.goalStatus === 'required';
  });

  console.log('Matching skills calculation complete:', {
    totalToggled: toggledRoleSkills.length,
    matchingSkills: matchingSkills.length,
    competencyMatches: competencyMatchingSkills.length,
    skillGoalMatches: skillGoalMatchingSkills.length,
    competencyMatchingSkills: competencyMatchingSkills.map(s => s.title)
  });

  return {
    matchingSkills,
    competencyMatchingSkills,
    skillGoalMatchingSkills,
    totalToggledSkills: toggledRoleSkills.length
  };
};