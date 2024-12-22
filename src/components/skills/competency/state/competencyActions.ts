import { RoleState, RoleSkillState, RoleSkillRequirement } from '../../../../types/skillTypes';
import { saveRoleState } from './storageUtils';

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
          id: skillName,
          level, 
          requirement
        }
      }
    }
  };

  saveRoleState(roleId, updatedRoleState[roleId]);
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

  saveRoleState(roleId, updatedRoleState[roleId]);
  return updatedRoleState;
};