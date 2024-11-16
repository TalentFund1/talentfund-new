import { useCompetencyStore } from "./CompetencyState";
import { useToggledSkills } from "../context/ToggledSkillsContext";

interface SkillCompetencyState {
  level: string;
  required: string;
}

export const useCompetencyStateReader = () => {
  const { currentStates } = useCompetencyStore();
  const { toggledSkills } = useToggledSkills();

  const getSkillCompetencyState = (skillName: string, levelKey: string = 'p4'): SkillCompetencyState | null => {
    if (!toggledSkills.has(skillName)) {
      return null;
    }

    const skillState = currentStates[skillName];
    if (!skillState) {
      return null;
    }

    // Get the specific level state
    const levelState = skillState[levelKey];
    if (!levelState) {
      return null;
    }

    return {
      level: levelState.level,
      required: levelState.required
    };
  };

  const getAllSkillStatesForLevel = (levelKey: string = 'p3'): Record<string, SkillCompetencyState> => {
    const states: Record<string, SkillCompetencyState> = {};
    
    Object.entries(currentStates).forEach(([skillName, skillLevels]) => {
      const levelState = skillLevels[levelKey.toLowerCase()];
      if (levelState) {
        states[skillName] = {
          level: levelState.level,
          required: levelState.required
        };
      }
    });

    return states;
  };

  return {
    getSkillCompetencyState,
    getAllSkillStatesForLevel
  };
};