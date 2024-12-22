import { useSkillsMatrixStore } from "../skills-matrix/SkillsMatrixState";
import { SkillState } from '../../skills/competency/state/types';

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