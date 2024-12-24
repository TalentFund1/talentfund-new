export const getLevelPriority = (level: string = 'unspecified') => {
  const priorities: { [key: string]: number } = {
    'advanced': 3,
    'intermediate': 2,
    'beginner': 1,
    'unspecified': 0
  };
  return priorities[level.toLowerCase()] ?? 0;
};

export const getSkillGoalPriority = (goalStatus: string) => {
  const priorities: { [key: string]: number } = {
    'skill_goal': 3,
    'required': 2,
    'preferred': 1,
    'not_interested': 0,
    'unknown': -1
  };
  return priorities[goalStatus.toLowerCase()] ?? -1;
};