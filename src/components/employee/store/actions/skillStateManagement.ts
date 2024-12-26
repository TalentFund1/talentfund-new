import { EmployeeSkillState, SkillLevel, SkillGoalStatus } from '../../types/employeeSkillTypes';

export const createSkillState = (
  level: SkillLevel = 'unspecified',
  goalStatus: string = 'unknown'
): EmployeeSkillState => {
  // Normalize goal status
  let normalizedStatus: SkillGoalStatus = 'unknown';
  if (goalStatus === 'skill_goal' || goalStatus === 'required') {
    normalizedStatus = 'required';
  } else if (goalStatus === 'not_interested') {
    normalizedStatus = 'preferred';
  } else if (['required', 'preferred', 'unknown'].includes(goalStatus)) {
    normalizedStatus = goalStatus as SkillGoalStatus;
  }

  return {
    level,
    goalStatus: normalizedStatus,
    lastUpdated: new Date().toISOString(),
    confidence: 'medium'
  };
};

export const updateSkillState = (
  currentState: EmployeeSkillState,
  updates: Partial<EmployeeSkillState>
): EmployeeSkillState => {
  // Normalize goal status if it's being updated
  if (updates.goalStatus) {
    if (updates.goalStatus === 'skill_goal') {
      updates.goalStatus = 'required';
    } else if (updates.goalStatus === 'not_interested') {
      updates.goalStatus = 'preferred';
    } else if (!['required', 'preferred', 'unknown'].includes(updates.goalStatus)) {
      updates.goalStatus = 'unknown';
    }
  }

  return {
    ...currentState,
    ...updates,
    lastUpdated: new Date().toISOString()
  };
};

console.log('Skill state management updated with status normalization');