import { useCompetencyStore } from "./CompetencyState";
import { useToggledSkills } from "../context/ToggledSkillsContext";
import { useParams } from "react-router-dom";

interface SkillCompetencyState {
  level: string;
  required: string;
}

export const useCompetencyStateReader = () => {
  const { currentStates } = useCompetencyStore();
  const { toggledSkills } = useToggledSkills();
  const { id: roleId } = useParams<{ id: string }>();

  const getSkillCompetencyState = (skillName: string, levelKey: string = 'p4'): SkillCompetencyState | null => {
    console.log('Reading competency state:', { skillName, levelKey, roleId });
    
    if (!toggledSkills.has(skillName)) {
      console.log('Skill not toggled:', skillName);
      return null;
    }

    if (!roleId) {
      console.error('No role ID provided');
      return null;
    }

    const roleStates = currentStates[roleId];
    if (!roleStates || !roleStates[skillName]) {
      console.log('No state found for skill:', skillName);
      return null;
    }

    const levelState = roleStates[skillName][levelKey.toLowerCase()];
    if (!levelState) {
      console.log('No level state found for skill:', { skillName, levelKey });
      return null;
    }

    console.log('Found competency state:', { skillName, levelKey, state: levelState });
    return {
      level: levelState.level || 'unspecified',
      required: levelState.required || 'preferred'
    };
  };

  const getAllSkillStatesForLevel = (levelKey: string = 'p3'): Record<string, SkillCompetencyState> => {
    console.log('Getting all skill states for level:', levelKey);
    const states: Record<string, SkillCompetencyState> = {};
    
    if (!roleId) {
      console.error('No role ID provided');
      return states;
    }

    const roleStates = currentStates[roleId];
    
    if (roleStates) {
      Object.entries(roleStates).forEach(([skillName, skillLevels]) => {
        const levelState = skillLevels[levelKey.toLowerCase()];
        if (levelState) {
          states[skillName] = {
            level: levelState.level || 'unspecified',
            required: levelState.required || 'preferred'
          };
        }
      });
    }

    console.log('Retrieved all skill states:', states);
    return states;
  };

  return {
    getSkillCompetencyState,
    getAllSkillStatesForLevel
  };
};