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
      const levelState = roleStates[skillName][normalizedLevelKey];
      
      if (levelState) {
        return {
          level: levelState.level,
          required: levelState.required
        };
      }
    }
    return null;
  };

  const getSkillCompetencyState = (
    skillName: string, 
    levelKey: string,
    roleId: string,
    employeeId: string
  ): SkillCompetencyState => {
    if (!roleId || !employeeId) {
      console.error('Missing roleId or employeeId:', { roleId, employeeId });
      return defaultState;
    }

    const track = getTrackForRole(roleId);
    const normalizedLevel = normalizeLevel(levelKey, roleId, track);

    const savedState = findSavedState(skillName, levelKey, roleId, employeeId);
    if (savedState) {
      return savedState;
    }

    const defaultLevel = track === "Managerial" ? "intermediate" : "beginner";
    return {
      level: defaultLevel,
      required: "preferred"
    };
  };

  const getAllSkillStatesForLevel = (
    level: string,
    roleId: string,
    employeeId: string
  ): Record<string, SkillCompetencyState> => {
    const states: Record<string, SkillCompetencyState> = {};
    const roleSkillsData = roleSkills[roleId as keyof typeof roleSkills];
    
    if (!roleSkillsData) return states;

    const allSkills = [
      ...roleSkillsData.specialized,
      ...roleSkillsData.common,
      ...roleSkillsData.certifications
    ];

    allSkills.forEach(skill => {
      states[skill.title] = getSkillCompetencyState(skill.title, level, roleId, employeeId);
    });

    return states;
  };

  return {
    getSkillCompetencyState,
    getAllSkillStatesForLevel
  };
};