export const getLevelPriority = (level: string = 'unspecified') => {
  const priorities: { [key: string]: number } = {
    'advanced': 0,
    'intermediate': 1,
    'beginner': 2,
    'unspecified': 3
  };
  return priorities[level.toLowerCase()] ?? 3;
};

export const getInterestPriority = (requirement: string) => {
  const priorities: { [key: string]: number } = {
    'required': 0,
    'skill_goal': 0,
    'preferred': 1,
    'not_interested': 2,
    'unknown': 3
  };
  return priorities[requirement.toLowerCase()] ?? 3;
};

export const getRoleLevelPriority = (level: string) => {
  const priorities: { [key: string]: number } = {
    'advanced': 0,
    'intermediate': 1,
    'beginner': 2,
    'unspecified': 3
  };
  return priorities[level.toLowerCase()] ?? 3;
};

export const sortSkills = (skills: any[], currentStates: any) => {
  return [...skills].sort((a, b) => {
    if (!a?.title || !b?.title) {
      console.warn('Invalid skill object found during sorting:', { a, b });
      return 0;
    }

    // Sort by Role Skills level first
    const aRoleLevel = (a.roleLevel || 'unspecified').toLowerCase();
    const bRoleLevel = (b.roleLevel || 'unspecified').toLowerCase();
    
    const roleLevelDiff = getRoleLevelPriority(aRoleLevel) - getRoleLevelPriority(bRoleLevel);
    if (roleLevelDiff !== 0) return roleLevelDiff;

    // If Role Skills levels are the same, sort by current skill level
    const aState = currentStates[a.title];
    const bState = currentStates[b.title];
    
    const aLevel = (aState?.level || a.level || 'unspecified').toLowerCase();
    const bLevel = (bState?.level || b.level || 'unspecified').toLowerCase();
    
    const levelDiff = getLevelPriority(aLevel) - getLevelPriority(bLevel);
    if (levelDiff !== 0) return levelDiff;

    // If levels are the same, sort by interest/requirement
    const aInterest = (aState?.requirement || a.requirement || 'unknown').toLowerCase();
    const bInterest = (bState?.requirement || b.requirement || 'unknown').toLowerCase();
    const interestDiff = getInterestPriority(aInterest) - getInterestPriority(bInterest);
    if (interestDiff !== 0) return interestDiff;

    // Finally, sort alphabetically by title
    return a.title.localeCompare(b.title);
  });
};