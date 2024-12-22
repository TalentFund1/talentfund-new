import { useEmployeeStore } from "../../employee/store/employeeStore";
import { useToggledSkills } from "../context/ToggledSkillsContext";
import { roleSkills } from "../data/roleSkills";
import { useTrack } from "../context/TrackContext";

interface SkillCompetencyState {
  level: string;
  required: string;
}

const defaultState: SkillCompetencyState = {
  level: 'unspecified',
  required: 'preferred'
};

export const useCompetencyStateReader = () => {
  const { getCompetencyState } = useEmployeeStore();
  const { toggledSkills } = useToggledSkills();
  const { getTrackForRole } = useTrack();

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

    return getCompetencyState(employeeId, skillName, levelKey);
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
