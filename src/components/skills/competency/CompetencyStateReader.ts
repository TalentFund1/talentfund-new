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
    
    // Handle both formats: "M3" and "m3" or "3" for managerial
    if (track === "Managerial") {
      if (level.match(/^[3-6]$/)) {
        return `m${level.toLowerCase()}`;
      }
      const match = level.toLowerCase().match(/m[3-6]/);
      if (match) {
        return match[0];
      }
      // Default to m3 if no valid managerial level found
      return "m3";
    }

    // Handle professional track levels
    const match = level.toLowerCase().match(/p[1-6]/);
    if (match) {
      return match[0];
    }
    
    return level.toLowerCase().trim();
  };

  const getDefaultLevelForTrack = (track: string, roleLevel: string): string => {
    if (track === "Managerial") {
      const level = roleLevel.match(/\d/)?.[0] || "3";
      return `m${level}`;
    }
    return "p4";
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
          roleId,
          track: getTrackForRole(roleId)
        });
        return levelState;
      }
    }
    return null;
  };

  const getPrimaryRoleId = (): string => {
    const availableRoles = Object.keys(currentStates);
    if (availableRoles.length === 0) {
      console.log('No roles found in competency store, using default AI Engineer role');
      return "123";
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
    const defaultLevel = getDefaultLevelForTrack(track, levelKey);
    
    console.log('Reading competency state:', { 
      skillName, 
      levelKey,
      roleId,
      track,
      defaultLevel,
      hasToggledSkill: toggledSkills.has(skillName)
    });

    // First try to get saved state from CompetencyStore
    const savedState = findSavedState(skillName, levelKey, roleId);
    if (savedState) {
      console.log('Using saved state from CompetencyStore:', savedState);
      return savedState;
    }

    // If no saved state, determine the appropriate state based on track and level
    const defaultState: SkillCompetencyState = {
      level: defaultLevel,
      required: track === "Managerial" ? determineManagerialRequirement(levelKey) : "preferred"
    };
    
    console.log('No saved state found, using default state:', defaultState);
    return defaultState;
  };

  const determineManagerialRequirement = (levelKey: string): string => {
    const level = parseInt(levelKey.replace(/[^\d]/g, ''));
    // Higher managerial levels (M5-M6) typically require more skills
    return level >= 5 ? "required" : "preferred";
  };

  const getAllSkillStatesForLevel = (
    levelKey: string = 'm3',
    roleId: string = "126"
  ): Record<string, SkillCompetencyState> => {
    const track = getTrackForRole(roleId);
    const defaultLevel = getDefaultLevelForTrack(track, levelKey);
    
    console.log('Getting all skill states for level:', { 
      levelKey, 
      roleId,
      track,
      defaultLevel
    });
    
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