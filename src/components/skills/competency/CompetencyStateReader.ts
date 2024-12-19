import { useCompetencyStore } from "./CompetencyState";
import { useToggledSkills } from "../context/ToggledSkillsContext";
import { roleSkills } from "../data/roleSkills";
import { useTrack } from "../context/TrackContext";
import { getLevelPriority, normalizeLevel } from "./utils/levelUtils";
import { determineRequirement } from "./utils/requirementUtils";
import { SkillState } from "./state/types/competencyTypes";

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

  const findSavedState = (
    skillName: string, 
    levelKey: string, 
    roleId: string, 
    employeeId: string
  ): SkillCompetencyState | null => {
    const roleStates = currentStates[roleId]?.[employeeId];
    const track = getTrackForRole(roleId);
    
    if (roleStates?.[skillName]) {
      const normalizedLevelKey = normalizeLevel(levelKey, roleId, track);
      const levelState = roleStates[skillName][normalizedLevelKey] as SkillState;
      
      if (levelState) {
        return {
          level: levelState.level,
          required: levelState.required
        };
      }
    }
    return null;
  };

  const validateRoleId = (roleId: string): string => {
    if (!roleId) {
      console.error('No role ID provided');
      return "123"; // Default to AI Engineer if no role ID
    }

    if (!roleSkills[roleId as keyof typeof roleSkills]) {
      console.error('Role skills not found for ID:', roleId);
      // Try to find a matching role by title
      const matchingRole = Object.entries(roleSkills).find(([_, data]) => 
        data.title.toLowerCase() === roleId.toLowerCase()
      );
      
      if (matchingRole) {
        console.log('Found matching role by title:', matchingRole[0]);
        return matchingRole[0];
      }
      
      console.warn('Falling back to default role ID: 123');
      return "123";
    }

    return roleId;
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
    const validatedRoleId = validateRoleId(roleId);
    
    console.log('Reading competency state:', { 
      skillName, 
      levelKey,
      originalRoleId: roleId,
      validatedRoleId,
      hasToggledSkill: toggledSkills.has(skillName)
    });

    const track = getTrackForRole(validatedRoleId);
    const normalizedLevel = normalizeLevel(levelKey, validatedRoleId, track);

    // First try to get saved state
    const savedState = findSavedState(skillName, levelKey, validatedRoleId, employeeId);
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
      state: newDefaultState
    });

    return newDefaultState;
  };

  const getAllSkillStatesForLevel = (
    levelKey: string = 'p4',
    roleId: string,
    employeeId: string
  ): Record<string, SkillCompetencyState> => {
    const validatedRoleId = validateRoleId(roleId);
    
    console.log('Getting all skill states for level:', { 
      levelKey,
      originalRoleId: roleId,
      validatedRoleId
    });
    
    const states: Record<string, SkillCompetencyState> = {};
    const roleData = roleSkills[validatedRoleId as keyof typeof roleSkills];
    
    if (roleData) {
      const allSkills = [
        ...roleData.specialized,
        ...roleData.common,
        ...roleData.certifications
      ];

      allSkills.forEach(skill => {
        if (toggledSkills.has(skill.title)) {
          const competencyState = getSkillCompetencyState(
            skill.title, 
            levelKey, 
            validatedRoleId,
            employeeId
          );
          states[skill.title] = competencyState;
        }
      });
    }

    return states;
  };

  return {
    getSkillCompetencyState,
    getAllSkillStatesForLevel
  };
};