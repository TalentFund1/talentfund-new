import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { useEmployeeStore } from '../../employee/store/employeeStore';

export const getEmployeeSkills = (id: string): UnifiedSkill[] => {
  console.log('Getting skills for employee:', id);
  return useEmployeeStore.getState().getEmployeeSkills(id);
};

export const getEmployeeSkillLevel = (employeeId: string, skillTitle: string): string => {
  return useEmployeeStore.getState().getSkillState(employeeId, skillTitle).level;
};

export const getEmployeeSkillRequirement = (employeeId: string, skillTitle: string): string => {
  return useEmployeeStore.getState().getSkillState(employeeId, skillTitle).requirement;
};