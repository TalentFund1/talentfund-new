import { RoleSkillState, RoleState } from '../../../../types/skillTypes';

export const getCurrentRoleState = (
  roleStates: Record<string, RoleState>,
  roleId: string
): RoleState => {
  return roleStates[roleId] || {};
};

export const getSkillState = (
  roleStates: Record<string, RoleState>,
  roleId: string,
  skillName: string,
  levelKey: string
): RoleSkillState | undefined => {
  return roleStates[roleId]?.[skillName]?.[levelKey];
};