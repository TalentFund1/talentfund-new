import { SkillLevel } from '../../types/SkillTypes';

export const getLevelValue = (level: string = 'unspecified'): number => {
  const priorities: Record<string, number> = {
    'advanced': 3,
    'intermediate': 2,
    'beginner': 1,
    'unspecified': 0
  };
  return priorities[level.toLowerCase()] ?? 0;
};

export const compareSkillLevels = (
  employeeLevel: string,
  roleLevel: string
): boolean => {
  const employeePriority = getLevelValue(employeeLevel);
  const rolePriority = getLevelValue(roleLevel);

  console.log('Comparing skill levels:', {
    employeeLevel,
    roleLevel,
    employeePriority,
    rolePriority,
    isMatch: employeePriority >= rolePriority
  });

  return employeePriority >= rolePriority;
};