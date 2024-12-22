import { UnifiedSkill } from '@/types/skillTypes';
import { useEmployeeStore } from '../../employee/store/employeeStore';
import { generateSkillId } from '../../skills/data/skillDatabaseService';

export const getEmployeeSkills = (id: string): UnifiedSkill[] => {
  console.log('Getting skills for employee:', id);
  const skills = useEmployeeStore.getState().getEmployeeSkills(id);
  // Ensure all skills have consistent IDs
  return skills.map(skill => ({
    ...skill,
    id: generateSkillId(skill.title)
  }));
};

export const getEmployeeSkillLevel = (employeeId: string, skillTitle: string): string => {
  const skillId = generateSkillId(skillTitle);
  return useEmployeeStore.getState().getSkillState(employeeId, skillId)?.level || 'unspecified';
};

export const getEmployeeSkillRequirement = (employeeId: string, skillTitle: string): string => {
  const skillId = generateSkillId(skillTitle);
  return useEmployeeStore.getState().getSkillState(employeeId, skillId)?.requirement || 'unknown';
};