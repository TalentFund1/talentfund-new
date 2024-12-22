import { RoleState, RoleSkillState, RoleSkillRequirement } from '../../types/SkillTypes';
import { persistState } from './persistenceUtils';

export const setSkillStateAction = (
  roleStates: Record<string, RoleState>,
  skillName: string,
  level: string,
  levelKey: string,
  requirement: RoleSkillRequirement,
  roleId: string
): Record<string, RoleState> => {
  console.log('Setting skill state:', { skillName, level, levelKey, requirement, roleId });
  
  const updatedRoleState = {
    ...roleStates,
    [roleId]: {
      ...roleStates[roleId],
      [skillName]: {
        ...roleStates[roleId]?.[skillName],
        [levelKey]: { 
          level, 
          requirement 
        }
      }
    }
  };

  persistState(roleId, updatedRoleState[roleId]);
  return updatedRoleState;
};

export const setSkillProgressionAction = (
  roleStates: Record<string, RoleState>,
  skillName: string,
  progression: Record<string, RoleSkillState>,
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

  persistState(roleId, updatedRoleState[roleId]);
  return updatedRoleState;
};

export const resetLevelsAction = (
  roleStates: Record<string, RoleState>,
  roleId: string
): Record<string, RoleState> => {
  console.log('Resetting levels for role:', roleId);
  
  const currentRoleState = roleStates[roleId] || {};
  const resetState: RoleState = {};

  Object.keys(currentRoleState).forEach(skillName => {
    resetState[skillName] = {};
    ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'm3', 'm4', 'm5', 'm6'].forEach(level => {
      resetState[skillName][level] = {
        level: 'unspecified',
        requirement: 'preferred'
      };
    });
  });

  console.log('Reset state:', resetState);
  persistState(roleId, resetState);

  return {
    ...roleStates,
    [roleId]: resetState
  };
};