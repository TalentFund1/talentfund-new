import { EmployeeSkillState, SkillLevel, SkillGoalStatus } from '../../types/employeeSkillTypes';

export const createSkillState = (
  level: SkillLevel = 'unspecified',
  goalStatus: SkillGoalStatus = 'unknown'
): EmployeeSkillState => {
  return {
    level,
    goalStatus,
    lastUpdated: new Date().toISOString(),
    confidence: 'medium'
  };
};

export const updateSkillState = (
  currentState: EmployeeSkillState,
  updates: Partial<EmployeeSkillState>
): EmployeeSkillState => {
  return {
    ...currentState,
    ...updates,
    lastUpdated: new Date().toISOString()
  };
};

console.log('Skill state management updated with status normalization');