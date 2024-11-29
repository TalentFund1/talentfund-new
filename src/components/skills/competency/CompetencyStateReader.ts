import { useCompetencyStore } from "./CompetencyState";
import { useToggledSkills } from "../context/ToggledSkillsContext";
import { roleSkills } from "../data/roleSkills";

interface SkillCompetencyState {
  level: string;
  required: string;
  requirement?: string;
}

const defaultState: SkillCompetencyState = {
  level: 'unspecified',
  required: 'preferred'
};

export const useCompetencyStateReader = () => {
  const { currentStates } = useCompetencyStore();
  const { toggledSkills } = useToggledSkills();

  const normalizeLevel = (level: string = ""): string => {
    if (!level) return "m4"; // Default to M4 for managerial track
    
    const match = level.toLowerCase().match(/[pm][1-6]/);
    if (match) {
      return match[0];
    }

    // Handle numeric levels for managerial track
    if (level.match(/^[3-6]$/)) {
      return `m${level}`;
    }

    return level.toLowerCase().trim();
  };

  const findSavedState = (skillName: string, levelKey: string): SkillCompetencyState | null => {
    const primaryRoleId = getPrimaryRoleId();
    const roleStates = currentStates[primaryRoleId];
    
    if (roleStates?.[skillName]) {
      const normalizedLevelKey = normalizeLevel(levelKey);
      const levelState = roleStates[skillName][normalizedLevelKey];
      if (levelState) {
        console.log('Found saved state for managerial track:', { 
          skillName, 
          levelKey: normalizedLevelKey, 
          state: levelState 
        });
        return levelState;
      }
    }
    return null;
  };

  const getPrimaryRoleId = (): string => {
    const availableRoles = Object.keys(currentStates);
    if (availableRoles.length === 0) {
      console.log('No roles found in competency store, using default');
      return "123";
    }
    console.log('Using primary role:', availableRoles[0]);
    return availableRoles[0];
  };

  const getSkillCompetencyState = (
    skillName: string, 
    levelKey: string = 'm4'
  ): SkillCompetencyState => {
    console.log('Reading competency state for managerial track:', { 
      skillName, 
      levelKey,
      hasToggledSkill: toggledSkills.has(skillName)
    });

    // First try to get saved state from CompetencyStore
    const savedState = findSavedState(skillName, levelKey);
    if (savedState) {
      console.log('Using saved state from CompetencyStore for managerial level:', savedState);
      return savedState;
    }

    // If no saved state, return default state
    console.log('No saved state found, using default state for managerial track:', defaultState);
    return { ...defaultState };
  };

  const getAllSkillStatesForLevel = (
    levelKey: string = 'm4'
  ): Record<string, SkillCompetencyState> => {
    console.log('Getting all skill states for managerial level:', { levelKey });
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
          states[skill.title] = competencyState;
        }
      });
    }

    console.log('Retrieved all skill states for managerial level:', { 
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