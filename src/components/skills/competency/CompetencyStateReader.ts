import { RoleState, RoleSkillState, RoleSkillRequirement } from '@/types/skillTypes';
import { useCompetencyStore } from './CompetencyState';

export const useCompetencyStateReader = () => {
  const { roleStates, currentStates } = useCompetencyStore();

  const getRoleState = (roleId: string): RoleState => {
    return roleStates[roleId] || {};
  };

  const getSkillCompetencyState = (skillName: string, levelKey: string, roleId: string): RoleSkillState | undefined => {
    return roleStates[roleId]?.[skillName]?.[levelKey];
  };

  const getCurrentSkillState = (skillName: string, roleId: string): RoleSkillState | undefined => {
    return currentStates[roleId]?.[skillName];
  };

  return {
    getRoleState,
    getSkillCompetencyState,
    getCurrentSkillState,
  };
};
