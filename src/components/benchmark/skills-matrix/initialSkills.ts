import { UnifiedSkill } from '../../skills/types/SkillTypes';

export const getEmployeeSkills = (id: string): UnifiedSkill[] => {
  console.log('Getting skills for employee:', id);
  // Return empty array as the store will handle the actual skills
  return [];
};

export const getEmployeeSkillLevel = (employeeId: string, skillTitle: string): string => {
  return 'unspecified';
};

export const getEmployeeSkillRequirement = (employeeId: string, skillTitle: string): string => {
  return 'unknown';
};