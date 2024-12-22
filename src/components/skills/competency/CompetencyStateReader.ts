import { useCompetencyStore } from "./CompetencyState";
import { RoleSkillState } from "./state/types";

export const useCompetencyStateReader = () => {
  const { roleStates } = useCompetencyStore();

  const getSkillCompetencyState = (
    skillName: string,
    levelKey: string,
    roleId: string
  ): RoleSkillState | undefined => {
    const roleState = roleStates[roleId];
    if (!roleState) return undefined;

    const skillState = roleState[skillName]?.[levelKey.toLowerCase()];
    if (!skillState) return undefined;

    return {
      level: skillState.level,
      requirement: skillState.requirement
    };
  };

  const getAllSkillStatesForLevel = (level: string, roleId: string) => {
    const roleState = roleStates[roleId];
    if (!roleState) return {};

    const states: Record<string, RoleSkillState> = {};
    Object.entries(roleState).forEach(([skillName, levelStates]) => {
      const state = levelStates[level.toLowerCase()];
      if (state) {
        states[skillName] = state;
      }
    });

    return states;
  };

  return {
    getSkillCompetencyState,
    getAllSkillStatesForLevel
  };
};