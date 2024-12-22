export interface SkillState {
  level: string;
  required: string;
  requirement: string;
}

export interface SkillTrackLevels {
  [key: string]: SkillState;
}

export interface CompetencyState {
  [skillName: string]: {
    [level: string]: SkillState;
  };
}

export interface RoleState {
  [roleId: string]: CompetencyState;
}