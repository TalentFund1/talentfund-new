export const getLevelPriority = (level: string = 'unspecified') => {
  const priorities: { [key: string]: number } = {
    'advanced': 0,
    'intermediate': 1,
    'beginner': 2,
    'unspecified': 3
  };
  return priorities[level.toLowerCase()] ?? 3;
};

export const getRequirementPriority = (required: string = 'preferred') => {
  const priorities: { [key: string]: number } = {
    'required': 0,
    'preferred': 1
  };
  return priorities[required.toLowerCase()] ?? 1;
};

export const getSkillGoalPriority = (requirement: string = 'unknown') => {
  const priorities: { [key: string]: number } = {
    'skill_goal': 0,
    'required': 0,
    'preferred': 1,
    'not_interested': 2,
    'unknown': 3
  };
  return priorities[requirement.toLowerCase()] ?? 3;
};

export const sortSkills = (skills: any[], currentStates: any) => {
  return skills.map(skill => ({
    ...skill,
    employeeLevel: currentStates[skill.title]?.level || skill.level || 'unspecified',
    roleLevel: skill.roleLevel || 'unspecified',
    requirement: currentStates[skill.title]?.requirement || skill.requirement || 'unknown'
  }))
  .sort((a, b) => {
    const aRoleLevel = a.roleLevel;
    const bRoleLevel = b.roleLevel;
    
    const roleLevelDiff = getLevelPriority(aRoleLevel) - getLevelPriority(bRoleLevel);
    if (roleLevelDiff !== 0) return roleLevelDiff;

    const employeeLevelDiff = getLevelPriority(a.employeeLevel) - getLevelPriority(b.employeeLevel);
    if (employeeLevelDiff !== 0) return employeeLevelDiff;

    const requirementDiff = getSkillGoalPriority(a.requirement) - getSkillGoalPriority(b.requirement);
    if (requirementDiff !== 0) return requirementDiff;

    return a.title.localeCompare(b.title);
  });
};