import { useCompetencyStore } from "../../benchmark/CompetencyState";
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
    levelKey: string = 'p4'
  ): SkillCompetencyState => {
    console.log('Reading competency state:', { 
      skillName, 
      levelKey,
      hasToggledSkill: toggledSkills.has(skillName)
    });

    // First try to get saved state from CompetencyStore
    const savedState = findSavedState(skillName, levelKey);
    if (savedState) {
      console.log('Using saved state from CompetencyStore:', savedState);
      return savedState;
    }

    // If no saved state, return default state
    console.log('No saved state found, using default state:', defaultState);
    return { ...defaultState };
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
          states[skill.title] = competencyState;
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