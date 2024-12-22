import { useSkillsMatrixStore } from "../skills-matrix/SkillsMatrixState";
import { EmployeeSkillState } from '@/types/skillTypes';

export const useSkillLevelState = (skillId: string, employeeId: string) => {
  const { currentStates, originalStates } = useSkillsMatrixStore();
  
  const getCurrentState = (): EmployeeSkillState => {
    const state = currentStates[employeeId]?.[skillId];
    if (state) {
      console.log(`Getting matrix skill state for ${skillId}:`, {
        level: state.level,
        requirement: state.requirement
      });
      return state;
    }
    return originalStates[employeeId]?.[skillId] || { 
      skillId,
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