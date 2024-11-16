import { useCompetencyStore } from "./CompetencyState";
import { useToggledSkills } from "../context/ToggledSkillsContext";
import { aiSkills } from '../data/skills/aiSkills';

interface SkillCompetencyState {
  level: string;
  required: string;
}

export const useCompetencyStateReader = () => {
  const { currentStates } = useCompetencyStore();
  const { toggledSkills } = useToggledSkills();

  const getSkillCompetencyState = (skillName: string, levelKey: string = 'p3'): SkillCompetencyState | null => {
    // Find the skill in aiSkills
    const skill = aiSkills.find(s => s.title === skillName);
    
    if (!skill) {
      return null;
    }

    // Get the track level data
    const trackData = skill.professionalTrack?.[levelKey.toUpperCase()];
    
    if (!trackData) {
      return null;
    }

    return {
      level: trackData.level,
      required: trackData.requirement
    };
  };

  const getAllSkillStatesForLevel = (levelKey: string = 'p3'): Record<string, SkillCompetencyState> => {
    const states: Record<string, SkillCompetencyState> = {};
    
    aiSkills.forEach(skill => {
      const trackData = skill.professionalTrack?.[levelKey.toUpperCase()];
      if (trackData) {
        states[skill.title] = {
          level: trackData.level,
          required: trackData.requirement
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