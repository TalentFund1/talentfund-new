import { EmployeeSkillRequirement } from '@/types/skillTypes';
import { useEmployeeStore } from '../store/employeeStore';

export const getEmployeeSkillLevel = (employeeId: string, skillId: string): string => {
  const state = useEmployeeStore.getState().getSkillState(employeeId, skillId);
  return state?.level || 'unspecified';
};

export const getEmployeeSkillRequirement = (employeeId: string, skillId: string): EmployeeSkillRequirement => {
  const state = useEmployeeStore.getState().getSkillState(employeeId, skillId);
  return state?.requirement || 'unknown';
};

export const setEmployeeSkillLevel = (employeeId: string, skillId: string, level: string): void => {
  const store = useEmployeeStore.getState();
  const currentState = store.getSkillState(employeeId, skillId);
  store.setSkillState(
    employeeId,
    skillId,
    level,
    currentState?.requirement || 'unknown'
  );
};

export const setEmployeeSkillRequirement = (employeeId: string, skillId: string, requirement: EmployeeSkillRequirement): void => {
  const store = useEmployeeStore.getState();
  const currentState = store.getSkillState(employeeId, skillId);
  store.setSkillState(
    employeeId,
    skillId,
    currentState?.level || 'unspecified',
    requirement
  );
};