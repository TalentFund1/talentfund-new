import { useCompetencyStore } from '../CompetencyState';
import { useToggledSkills } from '../../context/ToggledSkillsContext';
import { useTrack } from '../../context/TrackContext';
import { normalizeLevel } from '../utils/levelUtils';
import { determineRequirement } from '../utils/requirementUtils';
import { SkillCompetencyState, defaultState } from '../state/CompetencyStateTypes';

export const useCompetencyReader = () => {
  const { currentStates } = useCompetencyStore();
  const { toggledSkills } = useToggledSkills();
  const { getTrackForRole } = useTrack();

  const findSavedState = (
    skillName: string, 
    levelKey: string, 
    roleId: string
  ): SkillCompetencyState | null => {
    const roleStates = currentStates[roleId];
    const track = getTrackForRole(roleId);
    
    if (roleStates?.[skillName]) {
      const normalizedLevelKey = normalizeLevel(levelKey, roleId, track);
      return roleStates[skillName][normalizedLevelKey] || null;
    }
    return null;
  };

  const getSkillCompetencyState = (
    skillName: string, 
    levelKey: string = 'p4',
    roleId: string
  ): SkillCompetencyState => {
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

    const savedState = findSavedState(skillName, levelKey, roleId);
    if (savedState) {
      console.log('Using saved state:', savedState);
      return savedState;
    }

    const defaultLevel = track === "Managerial" ? "intermediate" : "beginner";
    const defaultRequired = determineRequirement(normalizedLevel, track);

    return {
      level: defaultLevel,
      required: defaultRequired
    };
  };

  return {
    getSkillCompetencyState
  };
};