import { useCompetencyStore } from "./CompetencyState";
import { RoleSkillState } from "@/types/skillTypes";

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
      id: skillState.id,
      skillId: skillState.skillId,
      level: skillState.level
    };
  };

  return {
    getSkillCompetencyState
  };
};