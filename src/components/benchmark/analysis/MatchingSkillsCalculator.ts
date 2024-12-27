import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { EmployeeSkillData } from '../../employee/types/employeeSkillTypes';
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

    const employeeLevelValue = getLevelValue(employeeSkillLevel);
    const roleLevelValue = getLevelValue(roleSkillLevel);

    // Simple comparison: levels must match if unspecified, otherwise employee level must be equal or higher
    const isMatch = (employeeSkillLevel === 'unspecified' && roleSkillLevel === 'unspecified') || 
                   (employeeSkillLevel !== 'unspecified' && employeeLevelValue >= roleLevelValue);

    console.log(`Skill ${skill.title} level comparison:`, {
      employeeLevel: employeeSkillLevel,
      roleLevel: roleSkillLevel,
      employeeLevelValue,
      roleLevelValue,
      isMatch,
      reason: isMatch ? 'Levels match or employee level exceeds requirement' : 'Levels do not match requirements'
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
    competencyMatchingSkills: competencyMatchingSkills.map(s => ({
      title: s.title,
      employeeLevel: getSkillState(s.title, employeeId)?.level,
      roleLevel: getSkillCompetencyState(s.title, comparisonLevel, selectedRole)?.level
    }))
  });

  return {
    matchingSkills,
    competencyMatchingSkills,
    skillGoalMatchingSkills,
    totalToggledSkills: toggledRoleSkills.length
  };
};