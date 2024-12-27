import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { useCompetencyStateReader } from '../../skills/competency/CompetencyStateReader';

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
  getSkillState: (skillTitle: string, employeeId: string) => any,
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

  const matchingSkills = toggledRoleSkills.filter(skill => {
    return employeeSkills.some(empSkill => empSkill.title === skill.title);
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
      roleLevel: roleSkillLevel
    });

    // Both unspecified is a match
    if (employeeSkillLevel === 'unspecified' && roleSkillLevel === 'unspecified') {
      console.log(`Skill ${skill.title} matches: Both levels are unspecified`);
      return true;
    }

    // If role is unspecified but employee has any level, it's a match
    if (roleSkillLevel === 'unspecified' && employeeSkillLevel !== 'unspecified') {
      console.log(`Skill ${skill.title} matches: Role unspecified, employee has level ${employeeSkillLevel}`);
      return true;
    }

    // For all other cases, employee level must be >= role level
    const employeeLevelValue = getLevelValue(employeeSkillLevel);
    const roleLevelValue = getLevelValue(roleSkillLevel);
    const isMatch = employeeLevelValue >= roleLevelValue;

    console.log(`Skill ${skill.title} comparison:`, {
      employeeLevel: employeeSkillLevel,
      roleLevel: roleSkillLevel,
      employeeLevelValue,
      roleLevelValue,
      isMatch,
      reason: isMatch ? 'Employee level meets or exceeds requirement' : 'Employee level below requirement'
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