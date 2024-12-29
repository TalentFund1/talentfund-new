import { EmployeeSkillState, SkillLevel, SkillGoalStatus } from '../../employee/types/employeeSkillTypes';

export const useSkillLevelState = (skillTitle: string) => {
  const getCurrentState = (): EmployeeSkillState => {
    return {
      level: 'unspecified' as SkillLevel,
      goalStatus: 'unknown' as SkillGoalStatus,
      lastUpdated: new Date().toISOString(),
      skillScore: 0,
      inDevelopmentPlan: false
    };
  };

  return {
    getCurrentState
  };
};