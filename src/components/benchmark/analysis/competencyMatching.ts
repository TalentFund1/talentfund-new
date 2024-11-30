import { SkillState } from "../CompetencyState";

export const getLevelPriority = (level: string = 'unspecified') => {
  const priorities: { [key: string]: number } = {
    'advanced': 3,
    'intermediate': 2,
    'beginner': 1,
    'unspecified': 0
  };
  return priorities[level.toLowerCase()] ?? 0;
};

export const isCompetencyMatch = (
  employeeLevel: string,
  roleLevel: string,
  track: string
): boolean => {
  const employeePriority = getLevelPriority(employeeLevel);
  const rolePriority = getLevelPriority(roleLevel);

  console.log('Competency level comparison:', {
    employeeLevel,
    roleLevel,
    employeePriority,
    rolePriority,
    track
  });

  // For Professional track, levels must match exactly
  if (track === "Professional") {
    return employeePriority === rolePriority;
  }

  // For Managerial track, employee level must be >= role level
  return employeePriority >= rolePriority;
};