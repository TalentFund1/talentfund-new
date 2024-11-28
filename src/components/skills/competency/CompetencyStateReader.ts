import { useCompetencyStore } from "./CompetencyState";
import { useToggledSkills } from "../context/ToggledSkillsContext";

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

  const findSavedState = (skillName: string, levelKey: string): SkillCompetencyState | null => {
    // Look through all role states for the skill
    for (const roleId of Object.keys(currentStates)) {
      const roleStates = currentStates[roleId];
      if (roleStates?.[skillName]) {
        const normalizedLevelKey = normalizeLevel(levelKey);
        const levelState = roleStates[skillName][normalizedLevelKey];
        if (levelState) {
          console.log('Found saved state:', { skillName, levelKey, roleId, state: levelState });
          return levelState;
        }
      }
    }
    return null;
  };

  const getSkillCompetencyState = (
    skillName: string, 
    levelKey: string = 'p4', 
    targetRoleId?: string
  ): SkillCompetencyState | null => {
    console.log('Reading competency state:', { 
      skillName, 
      levelKey, 
      targetRoleId,
      hasToggledSkill: toggledSkills.has(skillName)
    });

    // First try to find any saved state for this skill
    const savedState = findSavedState(skillName, levelKey);
    if (savedState) {
      return savedState;
    }

    // If no saved state is found, return unspecified state
    return {
      level: 'unspecified',
      required: 'preferred'
    };
  };

  const getAllSkillStatesForLevel = (
    levelKey: string = 'p4',
    targetRoleId?: string
  ): Record<string, SkillCompetencyState> => {
    console.log('Getting all skill states for level:', { levelKey, targetRoleId });
    const states: Record<string, SkillCompetencyState> = {};
    
    const effectiveRoleId = targetRoleId || Object.keys(currentStates)[0];
    if (!effectiveRoleId) {
      console.error('No role ID available');
      return states;
    }

    // Only return states for toggled skills
    Array.from(toggledSkills).forEach(skillTitle => {
      const competencyState = getSkillCompetencyState(skillTitle, levelKey, effectiveRoleId);
      if (competencyState) {
        states[skillTitle] = competencyState;
      }
    });

    console.log('Retrieved all skill states:', { 
      roleId: effectiveRoleId,
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