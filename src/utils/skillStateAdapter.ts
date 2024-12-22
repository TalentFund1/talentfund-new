import { 
  EmployeeSkillState, 
  RoleSkillState, 
  EmployeeSkillRequirement, 
  RoleSkillRequirement 
} from "../types/skillTypes";

// Convert employee requirement to role requirement
export const toRoleRequirement = (requirement: EmployeeSkillRequirement): RoleSkillRequirement => {
  switch (requirement) {
    case 'skill_goal':
      return 'required';
    case 'not_interested':
    case 'unknown':
      return 'preferred';
    default:
      return 'preferred';
  }
};

// Convert role requirement to employee requirement
export const toEmployeeRequirement = (requirement: RoleSkillRequirement): EmployeeSkillRequirement => {
  switch (requirement) {
    case 'required':
      return 'skill_goal';
    case 'preferred':
      return 'unknown';
    default:
      return 'unknown';
  }
};

// Convert employee skill state to role skill state
export const toRoleSkillState = (state: EmployeeSkillState): RoleSkillState => {
  return {
    id: state.skillId,
    level: state.level || 'unspecified',
    requirement: toRoleRequirement(state.requirement)
  };
};

// Convert role skill state to employee skill state
export const toEmployeeSkillState = (state: RoleSkillState, profileId: string): EmployeeSkillState => {
  return {
    profileId,
    skillId: state.id,
    level: state.level || 'unspecified',
    requirement: toEmployeeRequirement(state.requirement)
  };
};

// Convert a record of employee states to role states
export const toRoleStateRecord = (states: Record<string, EmployeeSkillState>): Record<string, RoleSkillState> => {
  const roleStates: Record<string, RoleSkillState> = {};
  for (const [key, state] of Object.entries(states)) {
    roleStates[key] = toRoleSkillState(state);
  }
  return roleStates;
};

// Convert a record of role states to employee states
export const toEmployeeStateRecord = (states: Record<string, RoleSkillState>, profileId: string): Record<string, EmployeeSkillState> => {
  const employeeStates: Record<string, EmployeeSkillState> = {};
  for (const [key, state] of Object.entries(states)) {
    employeeStates[key] = toEmployeeSkillState(state, profileId);
  }
  return employeeStates;
};

// Safe getters that handle both types
export const getSkillLevel = (state: EmployeeSkillState | RoleSkillState): string => {
  if (!state) return 'unspecified';
  return state.level || 'unspecified';
};

export const getSkillRequirement = (state: EmployeeSkillState | RoleSkillState): EmployeeSkillRequirement | RoleSkillRequirement => {
  if (!state) return 'unknown';
  if (isEmployeeSkillState(state)) {
    return state.requirement;
  }
  return state.requirement || 'preferred';
};

// Type guards
export const isEmployeeSkillState = (state: any): state is EmployeeSkillState => {
  return state && 'profileId' in state && 'skillId' in state;
};

export const isRoleSkillState = (state: any): state is RoleSkillState => {
  return state && 'id' in state && !('profileId' in state);
};

console.log('Skill state adapter utilities loaded');