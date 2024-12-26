import { EmployeeSkillState, SkillLevel, SkillGoalStatus } from '../../types/employeeSkillTypes';

export const createSkillState = (
  level: SkillLevel = 'unspecified',
  goalStatus: SkillGoalStatus = 'unknown'
): EmployeeSkillState => ({
  level,
  goalStatus,
  lastUpdated: new Date().toISOString(),
  confidence: 'medium'
});

export const updateSkillState = (
  currentState: EmployeeSkillState,
  updates: Partial<EmployeeSkillState>
): EmployeeSkillState => {
  // Normalize any incoming legacy status values
  if (updates.goalStatus === 'skill_goal') {
    updates.goalStatus = 'required';
  } else if (updates.goalStatus === 'not_interested') {
    updates.goalStatus = 'preferred';
  }

  return {
    ...currentState,
    ...updates,
    lastUpdated: new Date().toISOString()
  };
};

console.log('Skill state management updated with status normalization');