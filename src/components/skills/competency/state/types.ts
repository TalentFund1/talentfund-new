export interface SkillState {
  level: string;
  required?: string;
  requirement: string;
}

export interface RoleState {
  [skillName: string]: {
    [level: string]: SkillState;
  };
}

export interface CompetencyState {
  roleStates: {
    [roleId: string]: RoleState;
  };
  hasChanges: boolean;
}