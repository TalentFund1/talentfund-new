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

    // Normalize level key to lowercase and ensure it exists
    const normalizedLevelKey = levelKey.toLowerCase();
    const levelState = roleStates[skillName][normalizedLevelKey];

    // If no exact level match is found, try to find the closest matching level
    if (!levelState) {
      console.log('No exact level state found for skill:', { skillName, levelKey });
      
      // Get all available levels for this skill
      const availableLevels = Object.keys(roleStates[skillName]);
      
      if (availableLevels.length > 0) {
        // Find the closest matching level based on the level number
        const targetLevelNum = parseInt(normalizedLevelKey.replace(/[^0-9]/g, '')) || 4;
        
        const closestLevel = availableLevels.reduce((prev, curr) => {
          const prevNum = parseInt(prev.replace(/[^0-9]/g, '')) || 4;
          const currNum = parseInt(curr.replace(/[^0-9]/g, '')) || 4;
          
          return Math.abs(currNum - targetLevelNum) < Math.abs(prevNum - targetLevelNum) ? curr : prev;
        });
        
        console.log('Using closest matching level:', { 
          skillName, 
          requestedLevel: levelKey,
          closestLevel,
          state: roleStates[skillName][closestLevel] 
        });
        
        return {
          level: roleStates[skillName][closestLevel].level || 'unspecified',
          required: roleStates[skillName][closestLevel].required || 'preferred'
        };
      }
      
      return {
        level: 'unspecified',
        required: 'preferred'
      };
    }

    console.log('Found competency state:', { 
      skillName, 
      levelKey, 
      state: levelState 
    });
    
    return {
      level: levelState.level || 'unspecified',
      required: levelState.required || 'preferred'
    };
  };

  const getAllSkillStatesForLevel = (levelKey: string = 'p4'): Record<string, SkillCompetencyState> => {
    console.log('Getting all skill states for level:', levelKey);
    const states: Record<string, SkillCompetencyState> = {};
    
    if (!roleId) {
      console.error('No role ID provided');
      return states;
    }

    const roleStates = currentStates[roleId];
    
    if (roleStates) {
      Object.entries(roleStates).forEach(([skillName, skillLevels]) => {
        const competencyState = getSkillCompetencyState(skillName, levelKey);
        if (competencyState) {
          states[skillName] = competencyState;
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