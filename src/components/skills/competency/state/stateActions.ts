import { RoleState, SkillState } from './types';
import { persistState } from './persistenceUtils';

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
        [levelKey]: { 
          level, 
          required,
          goalStatus: 'unknown' 
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

  persistState(roleId, updatedRoleState[roleId]);
  return updatedRoleState;
};