import { useCompetencyStore } from "./CompetencyState";
import { useToggledSkills } from "../context/ToggledSkillsContext";
import { roleSkills } from "../data/roleSkills";
import { useTrack } from "../context/TrackContext";

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
  const { getTrackForRole } = useTrack();

  const normalizeLevel = (level: string = "", roleId: string = "123"): string => {
    const track = getTrackForRole(roleId);
    
    if (!level) {
      return track === "Managerial" ? "m3" : "p4";
    }
    
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

  const findSavedState = (skillName: string, levelKey: string, roleId: string): SkillCompetencyState | null => {
    const primaryRoleId = getPrimaryRoleId();
    const roleStates = currentStates[primaryRoleId];
    
    if (roleStates?.[skillName]) {
      const normalizedLevelKey = normalizeLevel(levelKey, roleId);
      const levelState = roleStates[skillName][normalizedLevelKey];
      if (levelState) {
        console.log('Found saved state for track:', { 
          skillName, 
          levelKey: normalizedLevelKey, 
          state: levelState,
          roleId
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
      return "126"; // Default to Engineering Manager
    }
    console.log('Using primary role:', availableRoles[0]);
    return availableRoles[0];
  };

  const getSkillCompetencyState = (
    skillName: string, 
    levelKey: string = 'm3',
    roleId: string = "126"
  ): SkillCompetencyState => {
    const track = getTrackForRole(roleId);
    console.log('Reading competency state:', { 
      skillName, 
      levelKey,
      roleId,
      track,
      hasToggledSkill: toggledSkills.has(skillName)
    });

    // First try to get saved state from CompetencyStore
    const savedState = findSavedState(skillName, levelKey, roleId);
    if (savedState) {
      console.log('Using saved state from CompetencyStore:', savedState);
      return savedState;
    }

    // If no saved state, return default state
    const defaultStateForTrack = {
      ...defaultState,
      level: track === "Managerial" ? "m3" : "p4"
    };
    
    console.log('No saved state found, using default state:', defaultStateForTrack);
    return defaultStateForTrack;
  };

  const getAllSkillStatesForLevel = (
    levelKey: string = 'm3',
    roleId: string = "126"
  ): Record<string, SkillCompetencyState> => {
    console.log('Getting all skill states for level:', { levelKey, roleId });
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
          const competencyState = getSkillCompetencyState(skill.title, levelKey, roleId);
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