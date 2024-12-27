import { useCompetencyStore } from "./CompetencyState";
import { useToggledSkills } from "../context/ToggledSkillsContext";
import { useTrack } from "../context/TrackContext";
import { getLevelPriority, normalizeLevel } from "./utils/levelUtils";
import { determineRequirement } from "./utils/requirementUtils";
import { useRoleSkillsStore } from "../store/roleSkillsStore";
import { roleSkills } from "../data/roleSkills";
import { useEmployeeSkillsStore } from "../../employee/store/employeeSkillsStore";

interface SkillCompetencyState {
  level: string;
  required: string;
}

const defaultState: SkillCompetencyState = {
  level: 'unspecified',
  required: 'preferred'
};

const getLevelValue = (level: string): number => {
  const values: { [key: string]: number } = {
    'advanced': 4,
    'intermediate': 3,
    'beginner': 2,
    'unspecified': 1
  };
  return values[level.toLowerCase()] ?? 1;
};

export const useCompetencyStateReader = () => {
  const { currentStates } = useCompetencyStore();
  const { toggledSkills } = useToggledSkills();
  const { getTrackForRole } = useTrack();
  const { getRoleSkills, getSkillRequirement } = useRoleSkillsStore();
  const employeeSkillsStore = useEmployeeSkillsStore();

  const findSavedState = (skillName: string, levelKey: string, roleId: string): SkillCompetencyState | null => {
    const roleStates = currentStates[roleId];
    const track = getTrackForRole(roleId);
    
    if (roleStates?.[skillName]) {
      const normalizedLevelKey = normalizeLevel(levelKey, roleId, track);
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
    employeeId?: string
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
      hasToggledSkill: toggledSkills.has(skillName)
    });

    // First try to get saved state from CompetencyStore
    const savedState = findSavedState(skillName, levelKey, roleId);
    if (savedState) {
      console.log('Using saved state from CompetencyStore:', savedState);
      return savedState;
    }

    // Get role requirement
    const skillRequirement = getSkillRequirement(roleId, skillName);
    if (skillRequirement) {
      console.log('Using role requirement:', skillRequirement);
      
      // If we have an employeeId, check if they have this skill
      if (employeeId) {
        const employeeSkills = employeeSkillsStore.getEmployeeSkills(employeeId);
        const hasSkill = employeeSkills.some(skill => skill.title === skillName);
        
        console.log('Checking employee skill:', {
          employeeId,
          skillName,
          hasSkill,
          employeeSkillCount: employeeSkills.length
        });

        if (hasSkill) {
          // If employee has the skill, use their level
          const employeeSkill = employeeSkills.find(skill => skill.title === skillName);
          return {
            level: employeeSkill?.level || 'unspecified',
            required: skillRequirement.requirementLevel
          };
        }
      }

      return {
        level: skillRequirement.minimumLevel,
        required: skillRequirement.requirementLevel
      };
    }

    // If no saved state or role requirement, determine default state
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
    roleId: string
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
      track
    });
    
    const states: Record<string, SkillCompetencyState> = {};
    const roleData = getRoleSkills(roleId);
    
    if (roleData) {
      const allSkills = [...roleData.specialized, ...roleData.common, ...roleData.certifications];
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