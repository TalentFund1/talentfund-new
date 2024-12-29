export interface CompetencyStateReader {
  getSkillCompetencyState: (skillName: string, levelKey: string, roleId: string) => SkillCompetencyState;
  getAllSkillStatesForLevel: (levelKey: string, roleId: string) => Record<string, SkillCompetencyState>;
}

export interface SkillCompetencyState {
  level: string;
  required: string;
}