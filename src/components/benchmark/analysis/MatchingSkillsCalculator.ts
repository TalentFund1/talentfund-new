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

    console.log('Comparing competency levels:', {
      skill: skill.title,
      employeeLevel: employeeSkillLevel,
      roleLevel: roleSkillLevel,
      employeeLevelValue: getLevelValue(employeeSkillLevel),
      roleLevelValue: getLevelValue(roleSkillLevel)
    });

    // Compare numeric level values
    const employeeLevelValue = getLevelValue(employeeSkillLevel);
    const roleLevelValue = getLevelValue(roleSkillLevel);

    // Match if employee level is equal to or higher than role level
    return employeeLevelValue >= roleLevelValue;
  });

  const skillGoalMatchingSkills = matchingSkills.filter(skill => {
    const skillState = getSkillState(skill.title, employeeId);
    return skillState?.goalStatus === 'required' || skillState?.goalStatus === 'skill_goal';
  });

  console.log('Matching skills calculation results:', {
    totalSkills: toggledRoleSkills.length,
    matchingSkills: matchingSkills.length,
    competencyMatches: competencyMatchingSkills.length,
    skillGoalMatches: skillGoalMatchingSkills.length
  });

  return {
    matchingSkills,
    competencyMatchingSkills,
    skillGoalMatchingSkills,
    totalToggledSkills: toggledRoleSkills.length
  };
};