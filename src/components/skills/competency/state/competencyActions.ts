import { RoleState, SkillState } from './types';
import { saveRoleState } from './storageUtils';

export const setSkillStateAction = (
  roleStates: Record<string, RoleState>,
  skillName: string,
  level: string,
  levelKey: string,
  required: string,
  roleId: string
): Record<string, RoleState> => {
  console.log('Setting skill state:', { skillName, level, levelKey, required, roleId });
  
  const updatedRoleState = {
    ...roleStates,
    [roleId]: {
      ...roleStates[roleId],
      [skillName]: {
        ...roleStates[roleId]?.[skillName],
        [levelKey]: { level, required }
      }
    }
  };

  saveRoleState(roleId, updatedRoleState[roleId]);
  return updatedRoleState;
};

export const setSkillProgressionAction = (
  roleStates: Record<string, RoleState>,
  skillName: string,
  progression: Record<string, SkillState>,
  roleId: string
): Record<string, RoleState> => {
  console.log('Setting skill progression:', { skillName, progression, roleId });
  
  const updatedRoleState = {
    ...roleStates,
    [roleId]: {
      ...roleStates[roleId],
      [skillName]: {
        ...roleStates[roleId]?.[skillName],
        ...progression
      }
    }
  };

  saveRoleState(roleId, updatedRoleState[roleId]);
  return updatedRoleState;
};

export const resetLevelsAction = (
  roleStates: Record<string, RoleState>,
  roleId: string
): Record<string, RoleState> => {
  console.log('Resetting levels for role:', roleId);
  
  const currentRoleState = roleStates[roleId] || {};
  const resetState: RoleState = {};

  // Reset each skill to unspecified/preferred
  Object.keys(currentRoleState).forEach(skillName => {
    resetState[skillName] = {};
    ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'm3', 'm4', 'm5', 'm6'].forEach(level => {
      resetState[skillName][level] = {
        level: 'unspecified',
        required: 'preferred'
      };
    });
  });

  console.log('Reset state:', resetState);
  saveRoleState(roleId, resetState);

  return {
    ...roleStates,
    [roleId]: resetState
  };
};