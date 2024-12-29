import { EmployeeSkillAchievement } from '../../employee/types/employeeSkillTypes';
import { RoleSkillRequirement } from './roleSkillTypes';

export interface SkillComparison {
  employeeSkill: EmployeeSkillAchievement;
  roleRequirement: RoleSkillRequirement;
  matchPercentage: number;
  gapLevel: number;
}

export interface SkillComparisonResult {
  matches: SkillComparison[];
  totalMatchPercentage: number;
  missingSkills: RoleSkillRequirement[];
  exceedingSkills: EmployeeSkillAchievement[];
}