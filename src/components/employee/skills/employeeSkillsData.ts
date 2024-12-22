import { UnifiedSkill, EmployeeSkillRequirement } from '../../skills/types/SkillTypes';
import { useEmployeeStore } from '../store/employeeStore';

export const getEmployeeSkillLevel = (employeeId: string, skillTitle: string): string => {
  return useEmployeeStore.getState().getSkillState(employeeId, skillTitle).level;
};

export const getEmployeeSkillRequirement = (employeeId: string, skillTitle: string): EmployeeSkillRequirement => {
  return useEmployeeStore.getState().getSkillState(employeeId, skillTitle).requirement;
};

export const setEmployeeSkillLevel = (employeeId: string, skillTitle: string, level: string): void => {
  const store = useEmployeeStore.getState();
  const currentState = store.getSkillState(employeeId, skillTitle);
  store.setSkillState(employeeId, skillTitle, level, currentState.requirement);
};

export const setEmployeeSkillRequirement = (employeeId: string, skillTitle: string, requirement: EmployeeSkillRequirement): void => {
  const store = useEmployeeStore.getState();
  const currentState = store.getSkillState(employeeId, skillTitle);
  store.setSkillState(employeeId, skillTitle, currentState.level, requirement);
};