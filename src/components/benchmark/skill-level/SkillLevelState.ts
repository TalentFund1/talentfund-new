import { useSkillsMatrixStore } from "../skills-matrix/SkillsMatrixState";
import { EmployeeSkillState, RoleSkillState } from '../../skills/types/SkillTypes';

export const useSkillLevelState = (skillTitle: string) => {
  const { currentStates, originalStates } = useSkillsMatrixStore();
  
  const getCurrentState = (): EmployeeSkillState => {
    const state = currentStates[skillTitle];
    if (state) {
      console.log(`Getting matrix skill state for ${skillTitle}:`, {
        level: state.level,
        requirement: state.requirement
      });
      return {
        level: state.level,
        requirement: state.requirement as EmployeeSkillState['requirement']
      };
    }
    return {
      level: 'unspecified',
      requirement: 'unknown'
    };
  };

  return {
    getCurrentState,
    currentStates,
    originalStates
  };
};