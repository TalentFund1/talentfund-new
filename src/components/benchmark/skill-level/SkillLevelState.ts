import { useSkillsMatrix } from "../skills-matrix/SkillsMatrixContext";

export const useSkillLevelState = (skillTitle: string) => {
  const { currentStates, originalStates } = useSkillsMatrix();
  
  const getCurrentState = () => {
    const state = currentStates[skillTitle];
    if (state) {
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