import { useSkillsMatrixStore } from "../skills-matrix/SkillsMatrixState";
import { EmployeeSkillState } from "../../employee/types/employeeSkillTypes";

export const useSkillLevelState = (skillTitle: string) => {
  const { currentStates } = useSkillsMatrixStore();
  
  const getCurrentState = (): EmployeeSkillState => {
    const state = currentStates[skillTitle];
    if (state) {
      console.log(`Getting matrix skill state for ${skillTitle}:`, {
        level: state.level,
        requirement: state.requirement,
        isSkillGoal: state.requirement === 'required'
      });
      return state;
    }

    // Return default state if none exists or if it's undefined
    const defaultState: EmployeeSkillState = {
      level: 'unspecified',
      requirement: 'preferred',
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