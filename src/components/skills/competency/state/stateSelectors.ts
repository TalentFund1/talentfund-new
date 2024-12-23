import { SkillState } from './types';

export const getCurrentRoleState = (
  roleStates: Record<string, Record<string, Record<string, SkillState>>>,
  roleId: string
): Record<string, Record<string, SkillState>> => {
  return roleStates[roleId] || {};
};

export const getSkillState = (
  roleStates: Record<string, Record<string, Record<string, SkillState>>>,
  roleId: string,
  skillName: string,
  levelKey: string
): SkillState | undefined => {
  return roleStates[roleId]?.[skillName]?.[levelKey];
};