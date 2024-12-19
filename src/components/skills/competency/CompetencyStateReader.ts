import { useCompetencyStore } from "./CompetencyState";
import { useToggledSkills } from "../context/ToggledSkillsContext";
import { roleSkills } from "../data/roleSkills";
import { useTrack } from "../context/TrackContext";
import { getLevelPriority, normalizeLevel } from "./utils/levelUtils";
import { determineRequirement } from "./utils/requirementUtils";
import { useParams } from "react-router-dom";

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
  const { currentStates, employeeStates, getEmployeeSkillState } = useCompetencyStore();
  const { toggledSkills } = useToggledSkills();
  const { getTrackForRole } = useTrack();
  const { id: employeeId } = useParams<{ id: string }>();

  const findSavedState = (skillName: string, levelKey: string, roleId: string): SkillCompetencyState | null => {
    // First check for employee-specific state
    if (employeeId) {
      const employeeState = getEmployeeSkillState(employeeId, skillName);
      if (employeeState) {
        console.log('Found employee-specific state:', {
          employeeId,
          skillName,
          state: employeeState
        });
        return employeeState;
      }
    }

    // Fall back to role-based state for benchmarking
    const roleStates = currentStates[roleId];
    const track = getTrackForRole(roleId);
    
    if (roleStates?.[skillName]) {
      const normalizedLevelKey = normalizeLevel(levelKey, roleId, track);
      const levelState = roleStates[skillName][normalizedLevelKey];
      
      console.log('Finding saved role state:', { 
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
    roleId: string
  ): SkillCompetencyState => {
    const validatedRoleId = roleId || "123";
    
    console.log('Reading competency state:', { 
      skillName, 
      levelKey,
      employeeId,
      roleId: validatedRoleId,
      hasToggledSkill: toggledSkills.has(skillName)
    });

    // First try to get employee-specific state
    if (employeeId) {
      const employeeState = getEmployeeSkillState(employeeId, skillName);
      if (employeeState) {
        return employeeState;
      }
    }

    // Fall back to role-based state or generate default
    const track = getTrackForRole(validatedRoleId);
    const normalizedLevel = normalizeLevel(levelKey, validatedRoleId, track);

    // Try to get saved state from CompetencyStore
    const savedState = findSavedState(skillName, levelKey, validatedRoleId);
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
    roleId: string
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
          const competencyState = getSkillCompetencyState(skill.title, levelKey, validatedRoleId);
          states[skill.title] = competencyState;
        }
      });
    }

    console.log('Retrieved all skill states:', { 
      roleId: validatedRoleId,
      level: levelKey,
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