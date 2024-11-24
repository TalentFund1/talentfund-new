export interface SkillLevelState {
  level: string;
  required: string;
}

export interface SkillState {
  [levelKey: string]: SkillLevelState;
}

export interface RoleCompetencyState {
  [skillName: string]: SkillState;
}

export interface CompetencyStorage {
  [roleId: string]: RoleCompetencyState;
}

export interface StorageValue {
  state: CompetencyStorage;
  version: number;
}