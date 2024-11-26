export const getSkillGoalPriority = (requirement: string) => {
  const priorities: { [key: string]: number } = {
    'required': 0,
    'skill_goal': 1,
    'preferred': 2,
    'not_interested': 3,
    'unknown': 4
  };
  return priorities[requirement.toLowerCase()] ?? 5;
};