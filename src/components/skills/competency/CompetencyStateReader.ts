import { useCompetencyStore } from "./CompetencyState";
import { useToggledSkills } from "../context/ToggledSkillsContext";
import { roleSkills } from "../data/roleSkills";
import { useTrack } from "../context/TrackContext";
import { getLevelPriority, normalizeLevel } from "./utils/levelUtils";
import { determineRequirement } from "./utils/requirementUtils";
import { getAllSkills } from "../data/skills/allSkills";
import { SkillState } from "../types/SkillTypes";

interface SkillCompetencyState {
  level: string;
  required: string;
}

const defaultState: SkillCompetencyState = {
  level: 'unspecified',
  required: 'preferred'
};

export const useCompetencyStateReader = () => {
  const { currentStates } = useCompetencyStore();
  const { toggledSkills } = useToggledSkills();
  const { getTrackForRole } = useTrack();

  const findSavedState = (
    skillName: string, 
    levelKey: string, 
    roleId: string,
    employeeId: string
  ): SkillCompetencyState | null => {
    const roleStates = currentStates[roleId];
    const employeeStates = roleStates?.[employeeId];
    const track = getTrackForRole(roleId);
    
    if (employeeStates?.[skillName]) {
      const normalizedLevelKey = normalizeLevel(levelKey, roleId, track);
      const levelState = employeeStates[skillName][normalizedLevelKey];
      
      if (levelState) {
        return levelState;
      }
    }
    return null;
  };

  const validateRoleId = (roleId: string): boolean => {
    if (!roleId || !roleSkills[roleId as keyof typeof roleSkills]) {
      console.error('Invalid role ID or role skills not found:', roleId);
      return false;
    }
    return true;
  };

  const getDefaultLevelForTrack = (levelKey: string, track: string): string => {
    if (track === "Managerial") {
      const levelNumber = parseInt(levelKey.replace('m', ''));
      if (levelNumber >= 5) return 'advanced';
      if (levelNumber >= 4) return 'intermediate';
      return 'beginner';
    } else {
      const levelNumber = parseInt(levelKey.replace('p', ''));
      if (levelNumber >= 5) return 'advanced';
      if (levelNumber >= 3) return 'intermediate';
      return 'beginner';
    }
  };

  const getSkillCompetencyState = (
    skillName: string, 
    levelKey: string = 'p4',
    roleId: string,
    employeeId: string
  ): SkillCompetencyState => {
    if (!validateRoleId(roleId)) {
      console.log('Using default state due to invalid role:', roleId);
      return defaultState;
    }

    const track = getTrackForRole(roleId);
    const normalizedLevel = normalizeLevel(levelKey, roleId, track);
    
    console.log('Reading competency state:', { 
      skillName, 
      levelKey,
      normalizedLevel,
      roleId,
      employeeId,
      track,
      hasToggledSkill: toggledSkills.has(skillName)
    });

    // First try to get saved state from CompetencyStore
    const savedState = findSavedState(skillName, levelKey, roleId, employeeId);
    if (savedState) {
      console.log('Using saved state from CompetencyStore:', savedState);
      return savedState;
    }

    // If no saved state, determine the appropriate state based on track and level
    const defaultLevel = getDefaultLevelForTrack(normalizedLevel, track);
    const defaultRequired = determineRequirement(normalizedLevel, track);

    const newDefaultState: SkillCompetencyState = {
      level: defaultLevel,
      required: defaultRequired
    };
    
    console.log('Generated default state based on track and level:', {
      skillName,
      track,
      level: normalizedLevel,
      state: newDefaultState
    });

    return newDefaultState;
  };

  const getAllSkillStatesForLevel = (
    levelKey: string = 'p4',
    roleId: string,
    employeeId: string
  ): Record<string, SkillCompetencyState> => {
    if (!validateRoleId(roleId)) {
      console.log('Returning empty states due to invalid role:', roleId);
      return {};
    }

    const track = getTrackForRole(roleId);
    const normalizedLevel = normalizeLevel(levelKey, roleId, track);
    
    console.log('Getting all skill states for level:', { 
      levelKey, 
      normalizedLevel,
      roleId,
      employeeId,
      track
    });
    
    const states: Record<string, SkillCompetencyState> = {};
    const roleData = roleSkills[roleId as keyof typeof roleSkills];
    
    if (roleData) {
      const allSkills = getAllSkills();

      allSkills.forEach(skill => {
        if (toggledSkills.has(skill.title)) {
          const competencyState = getSkillCompetencyState(skill.title, levelKey, roleId, employeeId);
          states[skill.title] = competencyState;
        }
      });
    }

    console.log('Retrieved all skill states:', { 
      roleId,
      employeeId,
      level: levelKey,
      track,
      stateCount: Object.keys(states).length,
      states 
    });
    
    return states;
  };

  return {
    getSkillCompetencyState,
    getAllSkillStatesForLevel
  };
};