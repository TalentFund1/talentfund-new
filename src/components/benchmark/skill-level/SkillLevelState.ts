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
    // Return default state if none exists
    return {
      level: 'unspecified',
      requirement: 'preferred',
      lastUpdated: new Date().toISOString()
    };
  };

  return {
    getCurrentState,
    currentStates
  };
};