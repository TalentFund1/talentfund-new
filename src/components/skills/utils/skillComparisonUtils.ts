import { EmployeeSkillAchievement, SkillLevel } from '../../employee/types/employeeSkillTypes';
import { RoleSkillRequirement } from '../types/roleSkillTypes';
import { SkillComparison } from '../types/skillComparison';

export const getLevelPriority = (level: string = 'unspecified'): number => {
  const priorities: Record<string, number> = {
    'advanced': 3,
    'intermediate': 2,
    'beginner': 1,
    'unspecified': 0
  };
  return priorities[level.toLowerCase()] ?? 0;
};

export const compareSkillLevels = (
  employeeSkill: EmployeeSkillAchievement,
  roleRequirement: RoleSkillRequirement
): SkillComparison => {
  const employeePriority = getLevelPriority(employeeSkill.level);
  const requiredPriority = getLevelPriority(roleRequirement.minimumLevel);

  console.log('Comparing skill levels:', {
    skill: employeeSkill.title,
    employeeLevel: employeeSkill.level,
    requiredLevel: roleRequirement.minimumLevel,
    employeePriority,
    requiredPriority
  });

  const matchPercentage = (employeePriority / Math.max(requiredPriority, 1)) * 100;
  const gapLevel = employeePriority - requiredPriority;

  return {
    employeeSkill,
    roleRequirement,
    matchPercentage,
    gapLevel
  };
};

export const getSkillMatchPercentage = (
  employeeSkills: EmployeeSkillAchievement[],
  roleRequirements: RoleSkillRequirement[]
): number => {
  if (roleRequirements.length === 0) return 0;

  const matchingSkills = roleRequirements.filter(requirement => {
    const employeeSkill = employeeSkills.find(skill => skill.title === requirement.title);
    if (!employeeSkill) return false;
    
    const comparison = compareSkillLevels(employeeSkill, requirement);
    return comparison.gapLevel >= 0;
  });

  return (matchingSkills.length / roleRequirements.length) * 100;
};