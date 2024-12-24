import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { useEmployeeSkillsStore } from '../store/employeeSkillsStore';
import { SkillLevel, SkillGoalStatus } from '../types/employeeSkillTypes';

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
  const normalizedLevel = normalizeSkillLevel(level);
  store.setSkillLevel(employeeId, skillTitle, normalizedLevel);
};

export const setEmployeeSkillRequirement = (employeeId: string, skillTitle: string, requirement: string): void => {
  console.log('Setting skill requirement:', { employeeId, skillTitle, requirement });
  const store = useEmployeeSkillsStore.getState();
  const normalizedRequirement = normalizeGoalStatus(requirement);
  store.setSkillGoalStatus(employeeId, skillTitle, normalizedRequirement);
};

export const initializeEmployeeSkills = (employeeId: string): void => {
  console.log('Initializing skills for employee:', employeeId);
  useEmployeeSkillsStore.getState().initializeEmployeeSkills(employeeId);
};

// Helper functions to normalize string values to proper types
const normalizeSkillLevel = (level: string): SkillLevel => {
  const validLevels: SkillLevel[] = ['beginner', 'intermediate', 'advanced', 'unspecified'];
  const normalizedLevel = level.toLowerCase() as SkillLevel;
  return validLevels.includes(normalizedLevel) ? normalizedLevel : 'unspecified';
};

const normalizeGoalStatus = (status: string): SkillGoalStatus => {
  const validStatuses: SkillGoalStatus[] = ['required', 'preferred', 'not-interested', 'unknown', 'skill_goal'];
  const normalizedStatus = status.toLowerCase() as SkillGoalStatus;
  return validStatuses.includes(normalizedStatus) ? normalizedStatus : 'unknown';
};