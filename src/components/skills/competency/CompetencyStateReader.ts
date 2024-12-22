import { useCompetencyStore } from "./CompetencyState";
import { useToggledSkills } from "../context/ToggledSkillsContext";
import { roleSkills } from "../data/roleSkills";
import { useTrack } from "../context/TrackContext";
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
    if (!roleStates) return null;

    const employeeStates = roleStates[employeeId];
    if (!employeeStates) return null;

    const skillState = employeeStates[skillName];
    if (!skillState) return null;

    const levelState = skillState[levelKey];
    if (!levelState) return null;

    return {
      level: levelState.level,
      required: levelState.required
    };
  };

  const getSkillCompetencyState = (
    skillName: string, 
    levelKey: string = 'p4',
    roleId: string,
    employeeId: string = 'default'
  ): SkillCompetencyState => {
    if (!roleId || !roleSkills[roleId as keyof typeof roleSkills]) {
      console.error('Invalid role ID:', roleId);
      return defaultState;
    }

    const track = getTrackForRole(roleId);
    console.log('Reading competency state:', { 
      skillName, 
      levelKey,
      roleId,
      employeeId,
      track,
      hasToggledSkill: toggledSkills.has(skillName)
    });

    const savedState = findSavedState(skillName, levelKey, roleId, employeeId);
    if (savedState) {
      console.log('Found saved state:', savedState);
      return savedState;
    }

    return defaultState;
  };

  const getAllSkillStatesForLevel = (
    levelKey: string = 'p4',
    roleId: string,
    employeeId: string = 'default'
  ): Record<string, SkillCompetencyState> => {
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
          states[skill.title] = getSkillCompetencyState(skill.title, levelKey, roleId, employeeId);
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