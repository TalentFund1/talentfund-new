import { EmployeeSkillAchievement } from '../../employee/types/employeeSkillTypes';
import { RoleSkillRequirement } from '../../skills/types/roleSkillTypes';
import { SkillComparison, SkillComparisonResult } from '../../skills/types/skillComparison';
import { compareSkillLevels, getSkillMatchPercentage } from '../../skills/utils/skillComparisonUtils';

export const calculateSkillComparison = (
  employeeSkills: EmployeeSkillAchievement[],
  roleRequirements: RoleSkillRequirement[]
): SkillComparisonResult => {
  console.log('Calculating skill comparison:', {
    employeeSkillCount: employeeSkills.length,
    roleRequirementCount: roleRequirements.length
  });

  const matches: SkillComparison[] = [];
  const missingSkills: RoleSkillRequirement[] = [];
  const exceedingSkills: EmployeeSkillAchievement[] = [];

  // Find matching and missing skills
  roleRequirements.forEach(requirement => {
    const employeeSkill = employeeSkills.find(skill => skill.title === requirement.title);
    if (employeeSkill) {
      matches.push(compareSkillLevels(employeeSkill, requirement));
    } else {
      missingSkills.push(requirement);
    }
  });

  // Find exceeding skills
  employeeSkills.forEach(skill => {
    if (!roleRequirements.some(req => req.title === skill.title)) {
      exceedingSkills.push(skill);
    }
  });

  const totalMatchPercentage = getSkillMatchPercentage(employeeSkills, roleRequirements);

  console.log('Calculated skill comparison result:', {
    totalMatches: matches.length,
    missingSkills: missingSkills.length,
    exceedingSkills: exceedingSkills.length,
    totalMatchPercentage
  });

  return {
    matches,
    totalMatchPercentage,
    missingSkills,
    exceedingSkills
  };
};