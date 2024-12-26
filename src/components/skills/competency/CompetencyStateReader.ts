import { SkillCompetencyState } from './state/types';

export interface CompetencyStateReader {
  getSkillCompetencyState: (skillName: string, levelKey: string, roleId: string) => SkillCompetencyState;
  getAllSkillStatesForLevel: (levelKey: string, roleId: string) => Record<string, SkillCompetencyState>;
}

export const useCompetencyStateReader = (): CompetencyStateReader => {
  return {
    getSkillCompetencyState: (skillName: string, levelKey: string, roleId: string) => {
      console.log('Getting skill competency state:', { skillName, levelKey, roleId });
      return {
        level: 'unspecified',
        required: 'preferred'
      };
    },
    getAllSkillStatesForLevel: (levelKey: string, roleId: string) => {
      console.log('Getting all skill states for level:', { levelKey, roleId });
      return {};
    }
  };
};