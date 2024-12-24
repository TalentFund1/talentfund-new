import { useSkillsMatrixStore } from "../skills-matrix/SkillsMatrixState";

export const useSkillLevelState = (skillTitle: string) => {
  const { currentStates } = useSkillsMatrixStore();
  
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
    return currentStates[skillTitle];
  };

  return {
    getCurrentState,
    currentStates
  };
};