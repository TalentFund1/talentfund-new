import { useCompetencyStore } from "./CompetencyState";
import { useToggledSkills } from "../context/ToggledSkillsContext";
import { roleSkills } from "../data/roleSkills";
import { useTrack } from "../context/TrackContext";
import { getLevelPriority, normalizeLevel } from "./utils/levelUtils";
import { determineRequirement } from "./utils/requirementUtils";

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

  const findSavedState = (skillName: string, levelKey: string, roleId: string): SkillCompetencyState | null => {
    const primaryRoleId = getPrimaryRoleId();
    const roleStates = currentStates[primaryRoleId];
    const track = getTrackForRole(roleId);
    
    if (roleStates?.[skillName]) {
      const normalizedLevelKey = normalizeLevel(levelKey, roleId);
      const levelState = roleStates[skillName][normalizedLevelKey];
      
      console.log('Finding saved state:', { 
        skillName, 
        levelKey: normalizedLevelKey, 
        state: levelState,
        roleId,
        track
      });
      
      if (levelState) {
        return levelState;
      }
    }
    return null;
  };

  const getPrimaryRoleId = (): string => {
    const availableRoles = Object.keys(currentStates);
    if (availableRoles.length === 0) {
      console.warn('No roles found in competency store');
      throw new Error('No roles available in competency store');
    }
    console.log('Using primary role:', availableRoles[0]);
    return availableRoles[0];
  };

  const validateRoleId = (roleId: string): boolean => {
    if (!roleId || !roleSkills[roleId as keyof typeof roleSkills]) {
      console.error('Invalid role ID or role skills not found:', roleId);
      return false;
    }
    return true;
  };

  const getSkillCompetencyState = (
    skillName: string, 
    levelKey: string = 'p4',
    roleId: string
  ): SkillCompetencyState => {
    if (!validateRoleId(roleId)) {
      console.log('Using default state due to invalid role:', roleId);
      return defaultState;
    }

    const track = getTrackForRole(roleId);
    const normalizedLevel = normalizeLevel(levelKey, roleId);
    
    console.log('Reading competency state:', { 
      skillName, 
      levelKey,
      normalizedLevel,
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

    // If no saved state, determine the appropriate state based on track and level
    const newDefaultState: SkillCompetencyState = {
      level: normalizedLevel,
      required: determineRequirement(normalizedLevel, track)
    };
    
    console.log('No saved state found, using default state:', newDefaultState);
    return newDefaultState;
  };

  const getAllSkillStatesForLevel = (
    levelKey: string = 'p4',
    roleId: string
  ): Record<string, SkillCompetencyState> => {
    if (!validateRoleId(roleId)) {
      console.log('Returning empty states due to invalid role:', roleId);
      return {};
    }

    const track = getTrackForRole(roleId);
    const normalizedLevel = normalizeLevel(levelKey, roleId);
    
    console.log('Getting all skill states for level:', { 
      levelKey, 
      normalizedLevel,
      roleId,
      track
    });
    
    const states: Record<string, SkillCompetencyState> = {};
    const roleData = roleSkills[roleId as keyof typeof roleSkills];
    
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
      roleId,
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