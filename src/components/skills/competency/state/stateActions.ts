import { RoleState, RoleSkillState, RoleSkillRequirement } from './types';
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