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

  const getAllToggledSkillStates = (levelKey: string = 'p4'): Record<string, SkillCompetencyState | null> => {
    const states: Record<string, SkillCompetencyState | null> = {};
    
    toggledSkills.forEach(skillName => {
      states[skillName] = getSkillCompetencyState(skillName, levelKey);
    });

    return states;
  };

  const getLevelPriority = (level: string): number => {
    const priorities: { [key: string]: number } = {
      'advanced': 0,
      'intermediate': 1,
      'beginner': 2,
      'unspecified': 3
    };
    return priorities[level.toLowerCase()] ?? 3;
  };

  return {
    getSkillCompetencyState,
    getAllToggledSkillStates,
    getLevelPriority
  };
};