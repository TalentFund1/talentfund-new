import { EmployeeState, RoleState, SkillState } from './types';
import { persistState } from './persistenceUtils';

export const setSkillStateAction = (
  roleStates: Record<string, EmployeeState>,
  skillName: string,
  level: string,
  levelKey: string,
  required: string,
  roleId: string,
  employeeId: string
): Record<string, EmployeeState> => {
  console.log('Setting skill state:', { skillName, level, levelKey, required, roleId, employeeId });
  
  const updatedRoleState = {
    ...roleStates,
    [roleId]: {
      ...roleStates[roleId],
      [employeeId]: {
        ...roleStates[roleId]?.[employeeId],
        [skillName]: {
          ...roleStates[roleId]?.[employeeId]?.[skillName],
          [levelKey]: { level, required }
        }
      }
    }
  };

  persistState(roleId, employeeId, updatedRoleState[roleId][employeeId]);
  return updatedRoleState;
};

export const setSkillProgressionAction = (
  roleStates: Record<string, EmployeeState>,
  skillName: string,
  progression: Record<string, SkillState>,
  roleId: string,
  employeeId: string
): Record<string, EmployeeState> => {
  console.log('Setting skill progression:', { skillName, progression, roleId, employeeId });
  
  const updatedRoleState = {
    ...roleStates,
    [roleId]: {
      ...roleStates[roleId],
      [employeeId]: {
        ...roleStates[roleId]?.[employeeId],
        [skillName]: {
          ...roleStates[roleId]?.[employeeId]?.[skillName],
          ...progression
        }
      }
    }
  };

  persistState(roleId, employeeId, updatedRoleState[roleId][employeeId]);
  return updatedRoleState;
};