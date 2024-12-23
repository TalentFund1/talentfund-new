import { useSkillsMatrixStore } from "../skills-matrix/SkillsMatrixState";
import { EmployeeSkillState } from '../../../types/skillTypes';

export const useSkillLevelState = (skillTitle: string) => {
  const { currentStates, skillStates } = useSkillsMatrixStore();
  
  const getCurrentState = (): EmployeeSkillState | undefined => {
    const state = currentStates[skillTitle];
    if (state) {
      console.log(`Getting matrix skill state for ${skillTitle}:`, {
        level: state.level,
        requirement: state.requirement
      });
      return state;
    }
    return skillStates[skillTitle];
  };

  return {
    getCurrentState,
    currentStates,
    skillStates
  };
};