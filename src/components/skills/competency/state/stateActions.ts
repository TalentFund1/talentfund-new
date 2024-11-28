import { CompetencyState } from './types';
import { initializeRoleState } from './initializeState';

export const setSkillStateAction = (
  state: CompetencyState,
  skillName: string,
  level: string,
  levelKey: string,
  required: string,
  roleId: string
) => {
  console.log('Setting skill state action:', { skillName, level, levelKey, required, roleId });
  
  // Initialize role state if it doesn't exist
  const roleState = state.roleStates[roleId] || initializeRoleState(roleId);
  
  // Initialize skill state if it doesn't exist
  const skillState = roleState[skillName] || {};
  
  const newRoleStates = {
    ...state.roleStates,
    [roleId]: {
      ...roleState,
      [skillName]: {
        ...skillState,
        [levelKey]: { level, required }
      }
    }
  };

  console.log('Updated role states:', newRoleStates);

  return {
    ...state,
    roleStates: newRoleStates,
    currentStates: {
      ...state.currentStates,
      [roleId]: newRoleStates[roleId]
    },
    hasChanges: true
  };
};

export const setSkillProgressionAction = (
  state: CompetencyState,
  skillName: string,
  progression: Record<string, { level: string; required: string }>,
  roleId: string
) => {
  console.log('Setting skill progression action:', { skillName, progression, roleId });
  
  // Initialize role state if it doesn't exist
  const roleState = state.roleStates[roleId] || initializeRoleState(roleId);
  
  // Initialize skill state if it doesn't exist
  const skillState = roleState[skillName] || {};
  
  const newRoleStates = {
    ...state.roleStates,
    [roleId]: {
      ...roleState,
      [skillName]: {
        ...skillState,
        ...progression
      }
    }
  };

  console.log('Updated role states with progression:', newRoleStates);

  return {
    ...state,
    roleStates: newRoleStates,
    currentStates: {
      ...state.currentStates,
      [roleId]: newRoleStates[roleId]
    },
    hasChanges: true
  };
};