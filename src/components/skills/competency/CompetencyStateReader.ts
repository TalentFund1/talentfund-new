import { useCompetencyStore } from "./CompetencyState";
import { useToggledSkills } from "../context/ToggledSkillsContext";
import { roleSkills } from "../data/roleSkills";

interface SkillCompetencyState {
  level: string;
  required: string;
  requirement?: string;
}

export const useCompetencyStateReader = () => {
  const { currentStates } = useCompetencyStore();
  const { toggledSkills } = useToggledSkills();

  const normalizeLevel = (level: string = ""): string => {
    if (!level) return "p4";
    
    const match = level.toLowerCase().match(/[pm][1-6]/);
    if (match) {
      return match[0];
    }

    if (level.match(/^[1-6]$/)) {
      return `p${level}`;
    }

    return level.toLowerCase().trim();
  };

  const getDefaultState = (skillName: string): SkillCompetencyState => {
    console.log('Getting default state for:', { skillName });
    return { level: 'unspecified', required: 'required' };
  };

  // Get the primary role ID that contains the saved states
  const getPrimaryRoleId = (): string => {
    const availableRoles = Object.keys(currentStates);
    if (availableRoles.length === 0) {
      console.log('No roles found in competency store, using default');
      return "123";
    }
    console.log('Using primary role:', availableRoles[0]);
    return availableRoles[0];
  };

  const findSavedState = (skillName: string, levelKey: string): SkillCompetencyState | null => {
    const primaryRoleId = getPrimaryRoleId();
    const roleStates = currentStates[primaryRoleId];
    
    if (roleStates?.[skillName]) {
      const normalizedLevelKey = normalizeLevel(levelKey);
      const levelState = roleStates[skillName][normalizedLevelKey];
      if (levelState) {
        console.log('Found saved state:', { skillName, levelKey, state: levelState });
        return levelState;
      }
    }
    return null;
  };

  const getSkillCompetencyState = (
    skillName: string, 
    levelKey: string = 'p4'
  ): SkillCompetencyState | null => {
    console.log('Reading competency state:', { 
      skillName, 
      levelKey,
      hasToggledSkill: toggledSkills.has(skillName)
    });

    // Always use the primary role's saved state
    const savedState = findSavedState(skillName, levelKey);
    if (savedState) {
      return savedState;
    }

    const primaryRoleId = getPrimaryRoleId();
    console.log('Using primary role ID:', primaryRoleId);

    const roleStates = currentStates[primaryRoleId];
    if (!roleStates || !roleStates[skillName]) {
      console.log('No state found for skill:', { skillName, primaryRoleId });
      return getDefaultState(skillName);
    }

    const normalizedLevelKey = normalizeLevel(levelKey);
    console.log('Normalized level key:', { 
      original: levelKey, 
      normalized: normalizedLevelKey,
      availableLevels: Object.keys(roleStates[skillName])
    });
    
    let levelState = roleStates[skillName][normalizedLevelKey];

    if (!levelState) {
      console.log('No exact level state found, searching for matching level...');
      const availableLevels = Object.keys(roleStates[skillName]);
      
      const exactMatch = availableLevels.find(level => 
        normalizeLevel(level) === normalizedLevelKey
      );

      if (exactMatch) {
        console.log('Found exact matching level:', exactMatch);
        levelState = roleStates[skillName][exactMatch];
      } else {
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

    console.log('Using level state:', { 
      skillName, 
      level: levelState.level, 
      required: levelState.required
    });
    
    return {
      level: levelState.level || getDefaultState(skillName).level,
      required: levelState.required || getDefaultState(skillName).required
    };
  };

  const getAllSkillStatesForLevel = (
    levelKey: string = 'p4'
  ): Record<string, SkillCompetencyState> => {
    console.log('Getting all skill states for level:', { levelKey });
    const states: Record<string, SkillCompetencyState> = {};
    
    const primaryRoleId = getPrimaryRoleId();
    const roleData = roleSkills[primaryRoleId as keyof typeof roleSkills];
    
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

    console.log('Retrieved all skill states:', { 
      roleId: primaryRoleId,
      level: levelKey,
      states 
    });
    
    return states;
  };

  return {
    getSkillCompetencyState,
    getAllSkillStatesForLevel
  };
};