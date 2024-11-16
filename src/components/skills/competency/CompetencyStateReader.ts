import { useCompetencyStore } from "./CompetencyState";
import { useToggledSkills } from "../context/ToggledSkillsContext";

interface SkillCompetencyState {
  level: string;
  required: string;
}

interface CompetencyStateMap {
  [skillName: string]: {
    [levelKey: string]: SkillCompetencyState;
  };
}

export const useCompetencyStateReader = () => {
  const { currentStates } = useCompetencyStore();
  const { toggledSkills } = useToggledSkills();

  const getSkillCompetencyState = (skillName: string): SkillCompetencyState | null => {
    if (!toggledSkills.has(skillName)) {
      return null;
    }

    const skillState = currentStates[skillName];
    if (!skillState) {
      return null;
    }

    // Find the highest level where the skill is marked as required
    const levels = Object.entries(skillState);
    let highestRequiredLevel: SkillCompetencyState | null = null;

    for (const [_, state] of levels) {
      if (state.required === 'required') {
        if (!highestRequiredLevel || 
            getLevelPriority(state.level) < getLevelPriority(highestRequiredLevel.level)) {
          highestRequiredLevel = state;
        }
      }
    }

    return highestRequiredLevel;
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

  const getAllToggledSkillStates = (): Record<string, SkillCompetencyState | null> => {
    const states: Record<string, SkillCompetencyState | null> = {};
    
    toggledSkills.forEach(skillName => {
      states[skillName] = getSkillCompetencyState(skillName);
    });

    return states;
  };

  return {
    getSkillCompetencyState,
    getAllToggledSkillStates
  };
};