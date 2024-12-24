import { EmployeeSkillState, SkillLevel, SkillGoalStatus } from '../../types/employeeSkillTypes';

export const createSkillState = (
  level: SkillLevel = 'unspecified',
  goalStatus: SkillGoalStatus = 'unknown'
): EmployeeSkillState => ({
  level,
  goalStatus,
  lastUpdated: new Date().toISOString(),
  confidence: 'medium' // Default confidence level
});

export const updateSkillState = (
  currentState: EmployeeSkillState,
  updates: Partial<EmployeeSkillState>
): EmployeeSkillState => ({
  ...currentState,
  ...updates,
  lastUpdated: new Date().toISOString()
});