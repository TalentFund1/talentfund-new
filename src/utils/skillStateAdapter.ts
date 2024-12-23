import { 
  EmployeeSkillState, 
  RoleSkillState,
  EmployeeSkillRequirement,
  RoleSkillRequirement
} from "../types/skillTypes";

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

export const toRoleSkillState = (state: EmployeeSkillState): RoleSkillState => {
  return {
    id: state.skillId,
    level: state.level || 'unspecified',
    requirement: toRoleRequirement(state.requirement)
  };
};

export const toEmployeeSkillState = (state: RoleSkillState, profileId: string): EmployeeSkillState => {
  return {
    id: state.id,
    profileId,
    skillId: state.id,
    level: state.level || 'unspecified',
    requirement: toEmployeeRequirement(state.requirement)
  };
};

console.log('Skill state adapter utilities loaded');