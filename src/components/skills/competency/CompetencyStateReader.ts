import { SkillCompetencyState } from './CompetencyState';
import { useCompetencyStore } from './state/stateStore';

export interface CompetencyStateReader {
  getSkillCompetencyState: (skillName: string, levelKey: string, roleId: string) => SkillCompetencyState;
  getAllSkillStatesForLevel: (levelKey: string, roleId: string) => Record<string, SkillCompetencyState>;
}

export const useCompetencyStateReader = (): CompetencyStateReader => {
  const store = useCompetencyStore();

  return {
    getSkillCompetencyState: (skillName: string, levelKey: string, roleId: string) => {
      console.log('Getting skill competency state:', { skillName, levelKey, roleId });
      return store.getSkillCompetencyState(skillName, levelKey, roleId);
    },
    getAllSkillStatesForLevel: (levelKey: string, roleId: string) => {
      console.log('Getting all skill states for level:', { levelKey, roleId });
      return store.getAllSkillStatesForLevel(levelKey, roleId);
    }
  };
};