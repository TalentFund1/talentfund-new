import { useCompetencyStore } from "./state/stateStore";
import { RoleSkillState } from "../types/SkillTypes";

export const useCompetencyStateReader = () => {
  const { roleStates } = useCompetencyStore();

  const getSkillCompetencyState = (
    skillName: string,
    levelKey: string,
    roleId: string
  ): RoleSkillState | undefined => {
    const roleState = roleStates[roleId];
    if (!roleState) return undefined;

    const skillState = roleState[skillName]?.[levelKey];
    if (!skillState) {
      console.log('No competency state found for:', {
        skillName,
        levelKey,
        roleId
      });
      return undefined;
    }

    return {
      level: skillState.level,
      requirement: skillState.requirement || 'preferred'
    };
  };

  return {
    getSkillCompetencyState
  };
};