import { CompetencyState } from './types';

export const setSkillStateAction = (
  state: CompetencyState,
  skillName: string,
  level: string,
  levelKey: string,
  required: string,
  roleId: string
) => {
  console.log('Setting skill state action:', { skillName, level, levelKey, required, roleId });
  
  const newRoleStates = {
    ...state.roleStates,
    [roleId]: {
      ...state.roleStates[roleId],
      [skillName]: {
        ...state.roleStates[roleId]?.[skillName],
        [levelKey]: { level, required }
      }
    }
  };

  return {
    roleStates: newRoleStates,
    currentStates: {
      ...state.currentStates,
      [roleId]: newRoleStates[roleId]
    },
    originalStates: state.originalStates,
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
  
  const newRoleStates = {
    ...state.roleStates,
    [roleId]: {
      ...state.roleStates[roleId],
      [skillName]: {
        ...state.roleStates[roleId]?.[skillName],
        ...progression
      }
    }
  };

  return {
    roleStates: newRoleStates,
    currentStates: {
      ...state.currentStates,
      [roleId]: newRoleStates[roleId]
    },
    originalStates: state.originalStates,
    hasChanges: true
  };
};