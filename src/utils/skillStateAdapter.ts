import { 
  EmployeeSkillState, 
  RoleSkillState, 
  RoleSkillRequirement,
  EmployeeSkillRequirement 
} from '../types/skillTypes';

// Convert employee requirement to role requirement
export const toRoleRequirement = (requirement: EmployeeSkillRequirement): RoleSkillRequirement => {
  switch (requirement) {
    case 'skill_goal':
      return 'required';
    case 'not_interested':
    case 'unknown':
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
    default:
      return 'unknown';
  }
};

// Convert employee skill state to role skill state
export const toRoleSkillState = (employeeState: EmployeeSkillState): RoleSkillState => {
  return {
    id: employeeState.skillId,
    level: employeeState.level || 'unspecified',
    requirement: toRoleRequirement(employeeState.requirement)
  };
};

// Convert role skill state to employee skill state
export const toEmployeeSkillState = (
  roleState: RoleSkillState, 
  employeeId: string
): EmployeeSkillState => {
  return {
    employeeId,
    skillId: roleState.id,
    level: roleState.level || 'unspecified',
    requirement: toEmployeeRequirement(roleState.requirement)
  };
};

// Convert a record of employee states to role states
export const toRoleSkillStateRecord = (
  employeeStates: Record<string, EmployeeSkillState>
): Record<string, RoleSkillState> => {
  const roleStates: Record<string, RoleSkillState> = {};
  
  for (const [key, state] of Object.entries(employeeStates)) {
    roleStates[key] = toRoleSkillState(state);
  }
  
  return roleStates;
};

// Convert a record of role states to employee states
export const toEmployeeSkillStateRecord = (
  roleStates: Record<string, RoleSkillState>,
  employeeId: string
): Record<string, EmployeeSkillState> => {
  const employeeStates: Record<string, EmployeeSkillState> = {};
  
  for (const [key, state] of Object.entries(roleStates)) {
    employeeStates[key] = toEmployeeSkillState(state, employeeId);
  }
  
  return employeeStates;
};

// Helper to safely get level from any skill state
export const getSkillLevel = (state: EmployeeSkillState | RoleSkillState | string): string => {
  if (typeof state === 'string') return state;
  return state.level || 'unspecified';
};

// Helper to safely get requirement from any skill state
export const getSkillRequirement = (
  state: EmployeeSkillState | RoleSkillState
): EmployeeSkillRequirement | RoleSkillRequirement => {
  return state.requirement;
};

console.log('Skill state adapter initialized');