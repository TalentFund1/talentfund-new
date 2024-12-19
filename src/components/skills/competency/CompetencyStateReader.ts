import { useCompetencyStore } from "./CompetencyState";
import { SkillState } from "./state/types/competencyTypes";

interface SkillCompetencyState {
  level: string;
  required: string;
}

export const useCompetencyStateReader = () => {
  const { currentStates } = useCompetencyStore();

  const getSkillCompetencyState = (
    skillName: string, 
    levelKey: string,
    roleId: string,
    employeeId: string
  ): SkillCompetencyState => {
    const roleState = currentStates[roleId]?.[employeeId];
    if (!roleState) {
      return { level: 'unspecified', required: 'preferred' };
    }

    const skillState = roleState[skillName];
    return skillState || { level: 'unspecified', required: 'preferred' };
  };

  const getAllSkillStatesForLevel = (
    level: string,
    roleId: string,
    employeeId: string
  ): Record<string, SkillState> => {
    const roleState = currentStates[roleId]?.[employeeId] || {};
    return roleState;
  };

  return {
    getSkillCompetencyState,
    getAllSkillStatesForLevel
  };
};