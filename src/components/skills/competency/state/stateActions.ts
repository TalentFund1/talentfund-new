import { RoleState, SkillState } from './types';
import { roleSkills } from '../../data/roleSkills';

const initializeSkillState = (skillName: string, roleId: string) => {
  console.log('Initializing skill state:', { skillName, roleId });
  const levels = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'm3', 'm4', 'm5', 'm6'];
  const initialState: Record<string, SkillState> = {};
  
  levels.forEach(level => {
    initialState[level] = {
      level: 'unspecified',
      required: 'preferred'
    };
  });
  
  return initialState;
};

const initializeRoleState = (roleId: string): RoleState => {
  console.log('Initializing role state:', { roleId });
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
  if (!currentRoleSkills) {
    console.warn('No skills found for role:', roleId);
    return {};
  }

  const allSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  const initialState: RoleState = {};
  allSkills.forEach(skill => {
    initialState[skill.title] = initializeSkillState(skill.title, roleId);
  });

  return initialState;
};

export const setSkillStateAction = (
  state: { roleStates: Record<string, RoleState> },
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
  const skillState = roleState[skillName] || initializeSkillState(skillName, roleId);
  
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
    roleStates: newRoleStates,
    hasChanges: true
  };
};

export const setSkillProgressionAction = (
  state: { roleStates: Record<string, RoleState> },
  skillName: string,
  progression: Record<string, SkillState>,
  roleId: string
) => {
  console.log('Setting skill progression action:', { skillName, progression, roleId });
  
  // Initialize role state if it doesn't exist
  const roleState = state.roleStates[roleId] || initializeRoleState(roleId);
  
  // Initialize skill state if it doesn't exist
  const skillState = roleState[skillName] || initializeSkillState(skillName, roleId);
  
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
    roleStates: newRoleStates,
    hasChanges: true
  };
};