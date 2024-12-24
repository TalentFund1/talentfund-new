import { useSkillsMatrixStore } from "../skills-matrix/SkillsMatrixState";
import { EmployeeSkillState, SkillLevel, SkillGoalStatus } from "../../employee/types/employeeSkillTypes";

export const useSkillLevelState = (skillTitle: string) => {
  const { currentStates } = useSkillsMatrixStore();
  
  const getCurrentState = (): EmployeeSkillState => {
    const state = currentStates[skillTitle];
    if (state) {
      console.log(`Getting matrix skill state for ${skillTitle}:`, {
        level: state.level,
        requirement: state.requirement,
        isSkillGoal: state.requirement === 'skill_goal'
      });
      return {
        level: state.level as SkillLevel,
        requirement: state.requirement as SkillGoalStatus,
        lastUpdated: new Date().toISOString()
      };
    }

    const defaultState: EmployeeSkillState = {
      level: 'unspecified',
      requirement: 'unknown',
      lastUpdated: new Date().toISOString()
    };

    console.log(`No existing state found for ${skillTitle}, using default:`, defaultState);
    return defaultState;
  };

  return {
    getCurrentState,
    currentStates
  };
};