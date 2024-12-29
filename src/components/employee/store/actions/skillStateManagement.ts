import { EmployeeSkillState, SkillLevel, SkillGoalStatus } from '../../types/employeeSkillTypes';

export const createSkillState = (
  level: SkillLevel = 'unspecified',
  goalStatus: SkillGoalStatus = 'unknown'
): EmployeeSkillState => ({
  level,
  goalStatus,
  lastUpdated: new Date().toISOString(),
  skillScore: getSkillScore(level)
});

export const updateSkillState = (
  currentState: EmployeeSkillState,
  updates: Partial<EmployeeSkillState>
): EmployeeSkillState => ({
  ...currentState,
  ...updates,
  lastUpdated: new Date().toISOString()
});

const getSkillScore = (level: SkillLevel): number => {
  switch (level) {
    case 'advanced':
      return Math.floor(Math.random() * 26) + 75; // 75-100
    case 'intermediate':
      return Math.floor(Math.random() * 26) + 50; // 50-75
    case 'beginner':
      return Math.floor(Math.random() * 26) + 25; // 25-50
    default:
      return Math.floor(Math.random() * 26); // 0-25
  }
};