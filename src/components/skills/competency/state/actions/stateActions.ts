import { RoleState, SkillState, EmployeeSkillState } from '../types/competencyTypes';
import { persistState } from '../utils/persistenceUtils';

export const getEmployeeStateKey = (employeeId: string, roleId: string) => `${employeeId}-${roleId}`;

export const setSkillStateAction = (
  roleStates: Record<string, RoleState>,
  employeeStates: EmployeeSkillState,
  skillName: string,
  level: string,
  levelKey: string,
  required: string,
  roleId: string,
  employeeId?: string
) => {
  console.log('Setting skill state:', { 
    skillName, 
    level, 
    levelKey, 
    required, 
    roleId,
    employeeId 
  });

  if (employeeId) {
    const updatedEmployeeStates = {
      ...employeeStates,
      [employeeId]: {
        ...employeeStates[employeeId],
        [roleId]: {
          ...employeeStates[employeeId]?.[roleId],
          [skillName]: {
            ...employeeStates[employeeId]?.[roleId]?.[skillName],
            [levelKey]: { level, required }
          }
        }
      }
    };

    return {
      roleStates,
      employeeStates: updatedEmployeeStates
    };
  }

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

  return {
    roleStates: updatedRoleState,
    employeeStates
  };
};

export const setSkillProgressionAction = (
  roleStates: Record<string, RoleState>,
  employeeStates: EmployeeSkillState,
  skillName: string,
  progression: Record<string, SkillState>,
  roleId: string,
  employeeId?: string
) => {
  console.log('Setting skill progression:', { 
    skillName, 
    progression, 
    roleId,
    employeeId 
  });

  if (employeeId) {
    const updatedEmployeeStates = {
      ...employeeStates,
      [employeeId]: {
        ...employeeStates[employeeId],
        [roleId]: {
          ...employeeStates[employeeId]?.[roleId],
          [skillName]: progression
        }
      }
    };

    return {
      roleStates,
      employeeStates: updatedEmployeeStates
    };
  }

  const updatedRoleState = {
    ...roleStates,
    [roleId]: {
      ...roleStates[roleId],
      [skillName]: progression
    }
  };

  return {
    roleStates: updatedRoleState,
    employeeStates
  };
};