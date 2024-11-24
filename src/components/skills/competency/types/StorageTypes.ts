export interface SkillLevelState {
  level: string;
  required: string;
}

export interface RoleCompetencyState {
  [skillName: string]: {
    [levelKey: string]: SkillLevelState;
  };
}

export interface CompetencyStorage {
  [roleId: string]: RoleCompetencyState;
}

export interface StorageValue {
  state: CompetencyStorage;
  version: number;
}