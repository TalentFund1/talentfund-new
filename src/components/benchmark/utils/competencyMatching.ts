import { UnifiedSkill } from "../../skills/types/SkillTypes";
import { EmployeeSkillState } from "../../employee/types/employeeSkillTypes";
import { SkillCompetencyState } from "../../skills/competency/types/competencyTypes";

export const getLevelValue = (level: string): number => {
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

export interface CompetencyMatch {
  isMatch: boolean;
  employeeLevelValue: number;
  roleLevelValue: number;
  employeeLevel: string;
  roleLevel: string;
}

export const checkCompetencyMatch = (
  employeeLevel: string = 'unspecified',
  roleLevel: string = 'unspecified'
): CompetencyMatch => {
  const employeeLevelValue = getLevelValue(employeeLevel);
  const roleLevelValue = getLevelValue(roleLevel);

  console.log('Checking competency match:', {
    employeeLevel,
    roleLevel,
    employeeLevelValue,
    roleLevelValue
  });

  // Both unspecified is NOT a match
  if (employeeLevel === 'unspecified' && roleLevel === 'unspecified') {
    return {
      isMatch: false,
      employeeLevelValue,
      roleLevelValue,
      employeeLevel,
      roleLevel
    };
  }

  // Role unspecified but employee has level IS a match
  if (roleLevel === 'unspecified' && employeeLevel !== 'unspecified') {
    return {
      isMatch: true,
      employeeLevelValue,
      roleLevelValue,
      employeeLevel,
      roleLevel
    };
  }

  // Compare numeric values for all other cases
  const isMatch = employeeLevelValue >= roleLevelValue;

  return {
    isMatch,
    employeeLevelValue,
    roleLevelValue,
    employeeLevel,
    roleLevel
  };
};

export const getCompetencyMatches = (
  skills: UnifiedSkill[],
  getSkillState: (skillTitle: string, employeeId: string) => EmployeeSkillState,
  getSkillCompetencyState: (skillTitle: string, levelKey: string, roleId: string) => SkillCompetencyState,
  employeeId: string,
  levelKey: string,
  roleId: string
): UnifiedSkill[] => {
  console.log('Getting competency matches:', {
    skillCount: skills.length,
    employeeId,
    levelKey,
    roleId
  });

  return skills.filter(skill => {
    const roleSkillState = getSkillCompetencyState(skill.title, levelKey, roleId);
    if (!roleSkillState) {
      console.log(`No role skill state found for ${skill.title}`);
      return false;
    }

    const employeeSkillState = getSkillState(skill.title, employeeId);
    const employeeLevel = employeeSkillState?.level || 'unspecified';
    const roleLevel = roleSkillState.level || 'unspecified';

    const match = checkCompetencyMatch(employeeLevel, roleLevel);

    console.log('Competency match result:', {
      skill: skill.title,
      ...match
    });

    return match.isMatch;
  });
};