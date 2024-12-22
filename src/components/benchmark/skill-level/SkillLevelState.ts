import { useSkillsMatrixStore } from "../skills-matrix/SkillsMatrixState";

export interface SkillState {
  level: string;
  required: string;
  requirement: string;  // Added this required property
}

export const useSkillLevelState = (skillTitle: string) => {
  const { currentStates, originalStates } = useSkillsMatrixStore();
  
  const getCurrentState = () => {
    const state = currentStates[skillTitle];
    if (state) {
      console.log(`Getting matrix skill state for ${skillTitle}:`, {
        level: state.level,
        requirement: state.requirement,
        isSkillGoal: state.requirement === 'required'
      });
      return state;
    }
    return originalStates[skillTitle];
  };

  return {
    getCurrentState,
    currentStates,
    originalStates
  };
};