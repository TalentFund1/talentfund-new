import { useCompetencyStore } from "./CompetencyState";
import { useToggledSkills } from "../context/ToggledSkillsContext";
import { SkillLevelState } from "../types/CompetencyTypes";

export const useCompetencyStateReader = () => {
  const { currentStates } = useCompetencyStore();
  const { toggledSkills } = useToggledSkills();

  const getSkillCompetencyState = (skillName: string, levelKey: string = 'p4'): SkillLevelState => {
    if (!toggledSkills.has(skillName)) {
      return {
        level: "unspecified",
        required: "preferred"
      };
    }

    const skillState = currentStates[skillName];
    if (!skillState) {
      return {
        level: "unspecified",
        required: "preferred"
      };
    }

    const levelState = skillState[levelKey];
    if (!levelState) {
      return {
        level: "unspecified",
        required: "preferred"
      };
    }

    return levelState;
  };

  const getAllSkillStatesForLevel = (levelKey: string = 'p3'): Record<string, SkillLevelState> => {
    const states: Record<string, SkillLevelState> = {};
    
    Object.entries(currentStates).forEach(([skillName, skillLevels]) => {
      const levelState = skillLevels[levelKey];
      if (levelState) {
        states[skillName] = levelState;
      }
    });

    return states;
  };

  return {
    getSkillCompetencyState,
    getAllSkillStatesForLevel
  };
};