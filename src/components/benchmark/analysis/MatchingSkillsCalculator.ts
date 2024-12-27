import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { EmployeeSkillData } from "../../employee/types/employeeSkillTypes";
import { useCompetencyStateReader } from "../../skills/competency/CompetencyStateReader";

interface MatchingSkillsResult {
  matchingSkills: UnifiedSkill[];
  competencyMatchingSkills: UnifiedSkill[];
  skillGoalMatchingSkills: UnifiedSkill[];
  totalToggledSkills: number;
}

const getLevelValue = (level: string): number => {
  const levelValues: { [key: string]: number } = {
    'advanced': 3,
    'intermediate': 2,
    'beginner': 1,
    'unspecified': 0
  };
  return levelValues[level.toLowerCase()] ?? 0;
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
  console.log('Calculating matching skills:', {
    toggledCount: toggledRoleSkills.length,
    employeeSkillsCount: employeeSkills.length,
    level: comparisonLevel,
    role: selectedRole,
    track
  });

  const { getSkillCompetencyState } = useCompetencyStateReader();

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

    console.log('Comparing competency levels for skill:', {
      skill: skill.title,
      employeeLevel: employeeSkillLevel,
      roleLevel: roleSkillLevel,
      employeeLevelValue: getLevelValue(employeeSkillLevel),
      roleLevelValue: getLevelValue(roleSkillLevel)
    });

    // Compare numeric level values
    const employeeLevelValue = getLevelValue(employeeSkillLevel);
    const roleLevelValue = getLevelValue(roleSkillLevel);

    // Special case: if role level is unspecified, any non-unspecified employee level is a match
    if (roleSkillLevel === 'unspecified' && employeeSkillLevel !== 'unspecified') {
      console.log(`Skill ${skill.title} matches due to unspecified role level`);
      return true;
    }

    // Regular comparison: employee level must be equal or higher
    const isMatch = employeeLevelValue >= roleLevelValue;
    console.log(`Skill ${skill.title} match result:`, {
      isMatch,
      employeeLevelValue,
      roleLevelValue,
      matchReason: isMatch ? 'Level meets or exceeds requirement' : 'Level below requirement'
    });

    return isMatch;
  });

  const skillGoalMatchingSkills = matchingSkills.filter(skill => {
    const skillState = getSkillState(skill.title, employeeId);
    return skillState?.goalStatus === 'required' || skillState?.goalStatus === 'skill_goal';
  });

  console.log('Matching skills calculation results:', {
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