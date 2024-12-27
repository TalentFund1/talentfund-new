import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { EmployeeSkillState } from "../../employee/types/employeeSkillTypes";
import { SkillCompetencyState } from "../../skills/competency/types/competencyTypes";

interface MatchingSkillsResult {
  matchingSkills: UnifiedSkill[];
  competencyMatchingSkills: UnifiedSkill[];
  skillGoalMatchingSkills: UnifiedSkill[];
  totalToggledSkills: number;
}

const getLevelValue = (level: string): number => {
  switch (level?.toLowerCase()) {
    case 'advanced':
      return 3;
    case 'intermediate':
      return 2;
    case 'beginner':
      return 1;
    default:
      return 0;
  }
};

export const calculateMatchingSkills = (
  toggledRoleSkills: UnifiedSkill[],
  employeeSkills: UnifiedSkill[],
  comparisonLevel: string,
  selectedRole: string,
  track: string,
  getSkillState: (skillTitle: string, employeeId: string) => EmployeeSkillState,
  employeeId: string,
  getSkillCompetencyState: (skillTitle: string, levelKey: string, roleId: string) => SkillCompetencyState
): MatchingSkillsResult => {
  console.log('Calculating matching skills:', {
    toggledSkillCount: toggledRoleSkills.length,
    employeeSkillCount: employeeSkills.length,
    comparisonLevel,
    selectedRole,
    track
  });

  // Basic skill matches - employee has the skill
  const matchingSkills = toggledRoleSkills.filter(skill => {
    return employeeSkills.some(empSkill => empSkill.title === skill.title);
  });

  // Competency matches - employee meets or exceeds required level
  const competencyMatchingSkills = toggledRoleSkills.filter(skill => {
    const roleSkillState = getSkillCompetencyState(skill.title, comparisonLevel, selectedRole);
    if (!roleSkillState) return false;

    const employeeSkillState = getSkillState(skill.title, employeeId);
    const employeeLevel = employeeSkillState?.level || 'unspecified';
    const roleLevel = roleSkillState.level;

    console.log('Comparing competency levels:', {
      skill: skill.title,
      employeeLevel,
      roleLevel
    });

    const employeeLevelValue = getLevelValue(employeeLevel);
    const roleLevelValue = getLevelValue(roleLevel);

    // Match if:
    // 1. Both levels are unspecified (counts as a match)
    // 2. Role level is unspecified but employee has any level (counts as a match)
    // 3. Employee level meets or exceeds role level
    const isMatch = 
      (employeeLevel === 'unspecified' && roleLevel === 'unspecified') ||
      (roleLevel === 'unspecified' && employeeLevel !== 'unspecified') ||
      employeeLevelValue >= roleLevelValue;

    console.log('Competency match result:', {
      skill: skill.title,
      isMatch,
      employeeLevelValue,
      roleLevelValue,
      reason: isMatch ? 'Meets or exceeds required level' : 'Below required level'
    });

    return isMatch;
  });

  // Skill goal matches
  const skillGoalMatchingSkills = toggledRoleSkills.filter(skill => {
    const skillState = getSkillState(skill.title, employeeId);
    return skillState?.goalStatus === 'skill_goal' || skillState?.goalStatus === 'required';
  });

  console.log('Final matching calculations:', {
    totalSkills: toggledRoleSkills.length,
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