import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { getUnifiedSkillData } from '../../skills/data/skillDatabaseService';

// Helper functions for employee skills
export const getEmployeeSkillLevel = (employeeId: string, skillTitle: string): string => {
  const skills = getEmployeeSkills(employeeId);
  const skill = skills.find(s => s.title === skillTitle);
  return skill?.level || 'unspecified';
};

export const getEmployeeSkillRequirement = (employeeId: string, skillTitle: string): string => {
  const skills = getEmployeeSkills(employeeId);
  const skill = skills.find(s => s.title === skillTitle);
  return skill?.requirement || 'unknown';
};