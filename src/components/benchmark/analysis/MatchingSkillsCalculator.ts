import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { EmployeeSkillState } from '../../employee/types/employeeSkillTypes';

interface MatchingSkillsResult {
  matchingSkills: UnifiedSkill[];
  competencyMatchingSkills: UnifiedSkill[];
  skillGoalMatchingSkills: UnifiedSkill[];
  totalToggledSkills: number;
}

const getLevelValue = (level: string): number => {
  switch (level.toLowerCase()) {
    case 'advanced':
      return 3;
    case 'intermediate':
      return 2;
    case 'beginner':
      return 1;
    default:
      return 0; // unspecified
  }
};

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

  // Initialize competency reader directly to avoid URL calls
  const { getSkillCompetencyState } = useCompetencyStateReader();

  const matchingSkills = toggledRoleSkills.filter(skill => {
    return employeeSkills.some(empSkill => empSkill.title === skill.title);
  });

  const competencyMatchingSkills = toggledRoleSkills.filter(skill => {
    const employeeSkillLevel = getSkillState(skill.title, employeeId)?.level || 'unspecified';
    const roleSkillState = getSkillCompetencyState(skill.title, comparisonLevel, selectedRole);
    const roleSkillLevel = roleSkillState?.level || 'unspecified';

    console.log('Comparing skill levels:', {
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