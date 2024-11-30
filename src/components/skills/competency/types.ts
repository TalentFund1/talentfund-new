export interface SkillCompetencyState {
  level: string;
  required: string;
  requirement?: string;
}

export interface CompetencyReaderState {
  getSkillCompetencyState: (skillName: string, levelKey?: string, roleId?: string) => SkillCompetencyState;
  getAllSkillStatesForLevel: (levelKey?: string, roleId?: string) => Record<string, SkillCompetencyState>;
}