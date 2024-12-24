import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { useEmployeeStore } from '../store/employeeStore';
import { SkillRequirement } from '../types/employeeSkillTypes';

export const getEmployeeSkillLevel = (employeeId: string, skillTitle: string): string => {
  return useEmployeeStore.getState().getSkillState(employeeId, skillTitle).level;
};

export const getEmployeeSkillRequirement = (employeeId: string, skillTitle: string): SkillRequirement => {
  return useEmployeeStore.getState().getSkillState(employeeId, skillTitle).requirement;
};

export const setEmployeeSkillLevel = (employeeId: string, skillTitle: string, level: string): void => {
  const store = useEmployeeStore.getState();
  const currentState = store.getSkillState(employeeId, skillTitle);
  store.setSkillState(employeeId, skillTitle, level, currentState.requirement);
};

export const setEmployeeSkillRequirement = (employeeId: string, skillTitle: string, requirement: SkillRequirement): void => {
  const store = useEmployeeStore.getState();
  const currentState = store.getSkillState(employeeId, skillTitle);
  store.setSkillState(employeeId, skillTitle, currentState.level, requirement);
};