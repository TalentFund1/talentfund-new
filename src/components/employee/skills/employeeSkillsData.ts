import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { useEmployeeSkillsStore } from '../store/employeeSkillsStore';

export const getEmployeeSkillLevel = (employeeId: string, skillTitle: string): string => {
  console.log('Getting skill level:', { employeeId, skillTitle });
  return useEmployeeSkillsStore.getState().getSkillState(employeeId, skillTitle).level;
};

export const getEmployeeSkillRequirement = (employeeId: string, skillTitle: string): string => {
  console.log('Getting skill requirement:', { employeeId, skillTitle });
  return useEmployeeSkillsStore.getState().getSkillState(employeeId, skillTitle).requirement;
};

export const setEmployeeSkillLevel = (employeeId: string, skillTitle: string, level: string): void => {
  console.log('Setting skill level:', { employeeId, skillTitle, level });
  const store = useEmployeeSkillsStore.getState();
  store.setSkillLevel(employeeId, skillTitle, level);
};

export const setEmployeeSkillRequirement = (employeeId: string, skillTitle: string, requirement: string): void => {
  console.log('Setting skill requirement:', { employeeId, skillTitle, requirement });
  const store = useEmployeeSkillsStore.getState();
  store.setSkillGoalStatus(employeeId, skillTitle, requirement);
};

export const initializeEmployeeSkills = (employeeId: string): void => {
  console.log('Initializing skills for employee:', employeeId);
  useEmployeeSkillsStore.getState().initializeEmployeeSkills(employeeId);
};