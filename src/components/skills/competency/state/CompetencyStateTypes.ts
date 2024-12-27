export interface SkillCompetencyState {
  level: string;
  required: string;
}

export const defaultState: SkillCompetencyState = {
  level: 'unspecified',
  required: 'preferred'
};