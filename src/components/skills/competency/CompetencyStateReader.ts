import { useCompetencyStore } from "./CompetencyState";
import { useToggledSkills } from "../context/ToggledSkillsContext";
import { useParams } from "react-router-dom";
import { roleSkills } from "../data/roleSkills";

interface SkillCompetencyState {
  level: string;
  required: string;
  requirement?: string;
}

export const useCompetencyStateReader = () => {
  const { currentStates } = useCompetencyStore();
  const { toggledSkills } = useToggledSkills();
  const { id: roleId } = useParams<{ id: string }>();

  const normalizeLevel = (level: string): string => {
    // Handle formats like "P4 - Senior" -> "p4"
    const match = level.toLowerCase().match(/[pm][1-6]/);
    if (match) {
      return match[0];
    }
    return level.toLowerCase().trim();
  };

  const getDefaultState = (skillName: string): SkillCompetencyState => {
    if (!roleId) {
      console.log('No role ID provided for skill:', skillName);
      return { level: 'advanced', required: 'required' };
    }

    const roleData = roleSkills[roleId as keyof typeof roleSkills];
    if (!roleData) {
      console.log('No role data found for role:', roleId);
      return { level: 'advanced', required: 'required' };
    }

    const allSkills = [
      ...roleData.specialized,
      ...roleData.common,
      ...roleData.certifications
    ];

    const skillData = allSkills.find(skill => skill.title === skillName);
    console.log('Found skill data:', { skillName, skillData, roleId });
    
    return {
      level: skillData?.level || 'advanced',
      required: skillData?.requirement || 'required'
    };
  };

  const getSkillCompetencyState = (skillName: string, levelKey: string = 'p4'): SkillCompetencyState | null => {
    console.log('Reading competency state:', { skillName, levelKey, roleId });
    
    if (!toggledSkills.has(skillName)) {
      console.log('Skill not toggled:', skillName);
      return null;
    }

    if (!roleId) {
      console.error('No role ID provided');
      return getDefaultState(skillName);
    }

    const roleStates = currentStates[roleId];
    if (!roleStates || !roleStates[skillName]) {
      console.log('No state found for skill:', skillName);
      return getDefaultState(skillName);
    }

    const normalizedLevelKey = normalizeLevel(levelKey);
    console.log('Normalized level key:', { original: levelKey, normalized: normalizedLevelKey });
    
    let levelState = roleStates[skillName][normalizedLevelKey];

    if (!levelState) {
      console.log('No exact level state found, searching for matching level...');
      // Try to find a matching level if exact match not found
      const availableLevels = Object.keys(roleStates[skillName]);
      
      // First try exact match after normalization
      const exactMatch = availableLevels.find(level => 
        normalizeLevel(level) === normalizedLevelKey
      );

      if (exactMatch) {
        console.log('Found exact matching level:', exactMatch);
        levelState = roleStates[skillName][exactMatch];
      } else {
        // Try partial matches
        const partialMatch = availableLevels.find(level => 
          normalizeLevel(level).includes(normalizedLevelKey) || 
          normalizedLevelKey.includes(normalizeLevel(level))
        );

        if (partialMatch) {
          console.log('Found partial matching level:', partialMatch);
          levelState = roleStates[skillName][partialMatch];
        }
      }

      if (!levelState) {
        console.log('No matching level found, using default state');
        return getDefaultState(skillName);
      }
    }

    console.log('Using level state:', { skillName, level: levelState.level, required: levelState.required });
    
    return {
      level: levelState.level || getDefaultState(skillName).level,
      required: levelState.required || getDefaultState(skillName).required
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
    const roleData = roleSkills[roleId as keyof typeof roleSkills];
    
    if (roleData) {
      const allSkills = [
        ...roleData.specialized,
        ...roleData.common,
        ...roleData.certifications
      ];

      allSkills.forEach(skill => {
        if (toggledSkills.has(skill.title)) {
          const competencyState = getSkillCompetencyState(skill.title, levelKey);
          if (competencyState) {
            states[skill.title] = competencyState;
          }
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