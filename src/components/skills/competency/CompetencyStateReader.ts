import { useCompetencyStore } from "./CompetencyState";
import { useToggledSkills } from "../context/ToggledSkillsContext";
import { roleSkills } from "../data/roleSkills";
import { useTrack } from "../context/TrackContext";
import { getLevelPriority, normalizeLevel } from "./utils/levelUtils";
import { determineRequirement } from "./utils/requirementUtils";
import { getAllSkills } from "../data/skills/allSkills";

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

  const findSavedState = (skillName: string, levelKey: string, roleId: string, isBenchmarking: boolean = false): SkillCompetencyState | null => {
    const roleStates = currentStates[roleId];
    const track = getTrackForRole(roleId);
    
    if (roleStates?.[skillName]) {
      // If not benchmarking, look for any defined level state
      if (!isBenchmarking) {
        const allLevels = track === "Managerial" 
          ? ['m3', 'm4', 'm5', 'm6']
          : ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'];

        // Find the highest level state available
        const definedStates = allLevels
          .map(level => roleStates[skillName][level])
          .filter(state => state && state.level !== 'unspecified');

        if (definedStates.length > 0) {
          // Return the highest level state
          return definedStates.reduce((prev, current) => {
            const prevPriority = getLevelPriority(prev.level);
            const currentPriority = getLevelPriority(current.level);
            return currentPriority > prevPriority ? current : prev;
          });
        }
      }

      // For benchmarking or if no states found, use the specific level
      const normalizedLevelKey = normalizeLevel(levelKey, roleId, track);
      const levelState = roleStates[skillName][normalizedLevelKey];
      
      console.log('Finding saved state:', { 
        skillName, 
        levelKey: normalizedLevelKey, 
        state: levelState,
        roleId,
        track,
        isBenchmarking
      });
      
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
    isBenchmarking: boolean = false
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
      track,
      isBenchmarking,
      hasToggledSkill: toggledSkills.has(skillName)
    });

    // First try to get saved state
    const savedState = findSavedState(skillName, levelKey, roleId, isBenchmarking);
    if (savedState) {
      console.log('Using saved state:', savedState);
      return savedState;
    }

    // If no saved state, determine the appropriate state based on track and level
    const defaultLevel = getDefaultLevelForTrack(normalizedLevel, track);
    const defaultRequired = determineRequirement(normalizedLevel, track);

    const newDefaultState: SkillCompetencyState = {
      level: defaultLevel,
      required: defaultRequired
    };
    
    console.log('Generated default state:', {
      skillName,
      track,
      level: normalizedLevel,
      state: newDefaultState,
      isBenchmarking
    });

    return newDefaultState;
  };

  const getAllSkillStatesForLevel = (
    levelKey: string = 'p4',
    roleId: string,
    isBenchmarking: boolean = false
  ): Record<string, SkillCompetencyState> => {
    if (!validateRoleId(roleId)) {
      console.log('Returning empty states due to invalid role:', roleId);
      return {};
    }

    const track = getTrackForRole(roleId);
    const normalizedLevel = normalizeLevel(levelKey, roleId, track);
    
    console.log('Getting all skill states:', { 
      levelKey, 
      normalizedLevel,
      roleId,
      track,
      isBenchmarking
    });
    
    const states: Record<string, SkillCompetencyState> = {};
    const roleData = roleSkills[roleId as keyof typeof roleSkills];
    
    if (roleData) {
      const allSkills = getAllSkills();

      allSkills.forEach(skill => {
        if (toggledSkills.has(skill.title)) {
          const competencyState = getSkillCompetencyState(skill.title, levelKey, roleId, isBenchmarking);
          states[skill.title] = competencyState;
        }
      });
    }

    console.log('Retrieved all skill states:', { 
      roleId,
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