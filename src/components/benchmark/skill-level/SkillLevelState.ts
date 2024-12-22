import { useSkillsMatrixStore } from "../skills-matrix/SkillsMatrixState";
import { RoleSkillState } from '@/types/skillTypes';

export const useSkillLevelState = (skillId: string, roleId: string) => {
  const { currentStates, originalStates } = useSkillsMatrixStore();
  
  const getCurrentState = (): RoleSkillState => {
    const state = currentStates[roleId]?.[skillId];
    if (state) {
      console.log(`Getting matrix skill state for ${skillId}:`, {
        level: state.level,
        requirement: state.requirement
      });
      return state;
    }
    return originalStates[roleId]?.[skillId] || { 
      id: skillId,
      level: 'unspecified', 
      requirement: 'preferred' 
    };
  };

  return {
    getCurrentState,
    currentStates,
    originalStates
  };
};