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

  const normalizeLevel = (level: string = "", roleId: string = ""): string => {
    const track = getTrackForRole(roleId);
    
    if (!level) {
      return track === "Managerial" ? "m5" : "p4";
    }
    
    // Handle professional track levels (P1-P6)
    if (track === "Professional") {
      const professionalMatch = level.toLowerCase().match(/p[1-6]/);
      if (professionalMatch) {
        return professionalMatch[0];
      }
      
      const numberMatch = level.match(/[1-6]/);
      if (numberMatch) {
        return `p${numberMatch[0]}`;
      }
      
      return level.toLowerCase().startsWith('p') ? level.toLowerCase() : 'p4';
    }
    
    // Handle managerial track levels (M3-M6)
    if (track === "Managerial") {
      const managerialMatch = level.toLowerCase().match(/m[3-6]/);
      if (managerialMatch) {
        return managerialMatch[0];
      }
      
      const numberMatch = level.match(/[3-6]/);
      if (numberMatch) {
        return `m${numberMatch[0]}`;
      }
      
      return level.toLowerCase().startsWith('m') ? level.toLowerCase() : 'm3';
    }
    
    return level.toLowerCase().trim();
  };

  const findSavedState = (skillName: string, levelKey: string, roleId: string): SkillCompetencyState | null => {
    const roleStates = currentStates[roleId];
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

  const getSkillCompetencyState = (
    skillName: string, 
    levelKey: string = 'p4',
    roleId: string
  ): SkillCompetencyState => {
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

    // First try to get saved state
    const savedState = findSavedState(skillName, levelKey, roleId);
    if (savedState) {
      console.log('Using saved state:', savedState);
      return savedState;
    }

    // If no saved state, determine the appropriate state based on track and level
    const defaultState: SkillCompetencyState = {
      level: normalizedLevel,
      required: determineRequirement(normalizedLevel, track)
    };
    
    console.log('Using default state:', defaultState);
    return defaultState;
  };

  const determineRequirement = (levelKey: string, track: string): string => {
    if (track === "Professional") {
      const level = parseInt(levelKey.replace(/[^\d]/g, ''));
      return level >= 4 ? "required" : "preferred";
    }
    if (track === "Managerial") {
      const level = parseInt(levelKey.replace(/[^\d]/g, ''));
      return level >= 5 ? "required" : "preferred";
    }
    return "preferred";
  };

  const getAllSkillStatesForLevel = (
    levelKey: string = 'p4',
    roleId: string
  ): Record<string, SkillCompetencyState> => {
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