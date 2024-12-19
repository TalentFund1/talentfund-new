import { CompetencyState, EmployeeState, RoleState, SkillState } from '../types/competencyTypes';
import { persistState } from '../utils/persistenceUtils';

export const setSkillStateAction = (
  state: CompetencyState,
  skillName: string,
  level: string,
  levelKey: string,
  required: string,
  roleId: string,
  employeeId: string
): Partial<CompetencyState> => {
  console.log('Setting skill state:', { skillName, level, levelKey, required, roleId, employeeId });
  
  const currentRoleState = state.roleStates[roleId]?.[employeeId] || {};
  const updatedRoleState: RoleState = {
    ...currentRoleState,
    [skillName]: {
      ...(currentRoleState[skillName] || {}),
      [levelKey]: { level, required }
    }
  };

  const newRoleStates = {
    ...state.roleStates,
    [roleId]: {
      ...state.roleStates[roleId],
      [employeeId]: updatedRoleState
    }
  };

  persistState(roleId, employeeId, updatedRoleState);

  return {
    roleStates: newRoleStates,
    currentStates: {
      ...state.currentStates,
      [roleId]: {
        ...state.currentStates[roleId],
        [employeeId]: updatedRoleState
      }
    },
    hasChanges: true
  };
};

export const setSkillProgressionAction = (
  state: CompetencyState,
  skillName: string,
  progression: Record<string, SkillState>,
  roleId: string,
  employeeId: string
): Partial<CompetencyState> => {
  console.log('Setting skill progression:', { skillName, progression, roleId, employeeId });
  
  const currentRoleState = state.roleStates[roleId]?.[employeeId] || {};
  const updatedRoleState: RoleState = {
    ...currentRoleState,
    [skillName]: {
      ...(currentRoleState[skillName] || {}),
      ...progression
    }
  };

  persistState(roleId, employeeId, updatedRoleState);

  return {
    roleStates: {
      ...state.roleStates,
      [roleId]: {
        ...state.roleStates[roleId],
        [employeeId]: updatedRoleState
      }
    },
    currentStates: {
      ...state.currentStates,
      [roleId]: {
        ...state.currentStates[roleId],
        [employeeId]: updatedRoleState
      }
    },
    hasChanges: true
  };
};