import { UnifiedSkill } from '../../skills/types/SkillTypes';
import { useEmployeeSkillsStore } from '../store/employeeSkillsStore';
import { SkillLevel, SkillGoalStatus } from '../types/employeeSkillTypes';

export const getEmployeeSkillLevel = (employeeId: string, skillTitle: string): string => {
  console.log('Getting skill level:', { employeeId, skillTitle });
  return useEmployeeSkillsStore.getState().getSkillState(employeeId, skillTitle).level;
};

export const getEmployeeSkillGoalStatus = (employeeId: string, skillTitle: string): string => {
  console.log('Getting skill goal status:', { employeeId, skillTitle });
  return useEmployeeSkillsStore.getState().getSkillState(employeeId, skillTitle).goalStatus;
};

export const setEmployeeSkillLevel = (employeeId: string, skillTitle: string, level: string): void => {
  console.log('Setting skill level:', { employeeId, skillTitle, level });
  const store = useEmployeeSkillsStore.getState();
  const normalizedLevel = normalizeSkillLevel(level);
  store.setSkillLevel(employeeId, skillTitle, normalizedLevel);
};

export const setEmployeeSkillGoalStatus = (employeeId: string, skillTitle: string, goalStatus: string): void => {
  console.log('Setting skill goal status:', { employeeId, skillTitle, goalStatus });
  const store = useEmployeeSkillsStore.getState();
  const normalizedGoalStatus = normalizeGoalStatus(goalStatus);
  store.setSkillGoalStatus(employeeId, skillTitle, normalizedGoalStatus);
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
  // Map legacy values to new format
  if (status === 'required') return 'skill_goal';
  if (status === 'preferred') return 'skill_goal';
  
  const validStatuses: SkillGoalStatus[] = ['skill_goal', 'not_interested', 'unknown'];
  const normalizedStatus = status.toLowerCase() as SkillGoalStatus;
  return validStatuses.includes(normalizedStatus) ? normalizedStatus : 'unknown';
};