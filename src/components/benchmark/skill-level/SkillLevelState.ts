import { useSkillsMatrixStore } from "../skills-matrix/SkillsMatrixState";

export const useSkillLevelState = (skillTitle: string) => {
  const { currentStates, originalStates } = useSkillsMatrixStore();
  
  const getCurrentState = () => {
    const state = currentStates[skillTitle];
    if (state) {
      console.log(`Skill State - ${skillTitle}:`, {
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