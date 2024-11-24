import { useCompetencyStore } from "./CompetencyState";
import { useToggledSkills } from "../context/ToggledSkillsContext";

interface SkillCompetencyState {
  level: string;
  required: string;
}

export const useCompetencyStateReader = () => {
  const { currentStates } = useCompetencyStore();
  const { toggledSkills } = useToggledSkills();

  const getSkillCompetencyState = (skillName: string, levelKey: string = 'p4', roleId: string = '123'): SkillCompetencyState | null => {
    console.log('Reading competency state:', { skillName, levelKey, roleId });
    
    if (!toggledSkills.has(skillName)) {
      console.log('Skill not toggled:', skillName);
      return null;
    }

    const roleState = currentStates[roleId];
    if (!roleState) {
      console.log('No state found for role:', roleId);
      return null;
    }

    const skillState = roleState[skillName];
    if (!skillState) {
      console.log('No state found for skill:', skillName);
      return null;
    }

    const levelState = skillState[levelKey];
    if (!levelState) {
      console.log('No level state found for skill:', { skillName, levelKey });
      return null;
    }

    console.log('Found competency state:', { skillName, levelKey, state: levelState });
    return {
      level: levelState.level,
      required: levelState.required
    };
  };

  const getAllSkillStatesForLevel = (levelKey: string = 'p3', roleId: string = '123'): Record<string, SkillCompetencyState> => {
    console.log('Getting all skill states for level:', levelKey);
    const states: Record<string, SkillCompetencyState> = {};
    
    const roleState = currentStates[roleId];
    if (!roleState) return states;

    Object.entries(roleState).forEach(([skillName, skillLevels]) => {
      const levelState = skillLevels[levelKey.toLowerCase()];
      if (levelState) {
        states[skillName] = {
          level: levelState.level,
          required: levelState.required
        };
      }
    });

    console.log('Retrieved all skill states:', states);
    return states;
  };

  return {
    getSkillCompetencyState,
    getAllSkillStatesForLevel
  };
};