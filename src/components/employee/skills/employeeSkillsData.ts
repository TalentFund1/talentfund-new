import { EmployeeSkillRequirement } from '@/types/skillTypes';
import { useEmployeeStore } from '../store/employeeStore';

export const getEmployeeSkillLevel = (employeeId: string, skillTitle: string): string => {
  const state = useEmployeeStore.getState().getSkillState(employeeId, skillTitle);
  return state?.level || 'unspecified';
};

export const getEmployeeSkillRequirement = (employeeId: string, skillTitle: string): EmployeeSkillRequirement => {
  const state = useEmployeeStore.getState().getSkillState(employeeId, skillTitle);
  return state?.requirement || 'unknown';
};

export const setEmployeeSkillLevel = (employeeId: string, skillTitle: string, level: string): void => {
  const store = useEmployeeStore.getState();
  const currentState = store.getSkillState(employeeId, skillTitle);
  store.setSkillState(employeeId, skillTitle, skillTitle, level, currentState?.requirement || 'unknown');
};

export const setEmployeeSkillRequirement = (employeeId: string, skillTitle: string, requirement: EmployeeSkillRequirement): void => {
  const store = useEmployeeStore.getState();
  const currentState = store.getSkillState(employeeId, skillTitle);
  store.setSkillState(employeeId, skillTitle, skillTitle, currentState?.level || 'unspecified', requirement);
};