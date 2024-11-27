import { useCompetencyStore } from "./CompetencyState";
import { useToggledSkills } from "../context/ToggledSkillsContext";
import { useParams } from "react-router-dom";
import { roleSkills } from "../data/roleSkills";

interface SkillCompetencyState {
  level: string;
  required: string;
}

export const useCompetencyStateReader = () => {
  const { currentStates } = useCompetencyStore();
  const { toggledSkills } = useToggledSkills();
  const { id: roleId } = useParams<{ id: string }>();

  const getDefaultState = (skillName: string): SkillCompetencyState => {
    if (!roleId) return { level: 'advanced', required: 'required' };

    const roleData = roleSkills[roleId as keyof typeof roleSkills];
    if (!roleData) return { level: 'advanced', required: 'required' };

    const allSkills = [
      ...roleData.specialized,
      ...roleData.common,
      ...roleData.certifications
    ];

    const skillData = allSkills.find(skill => skill.title === skillName);
    return {
      level: skillData?.level || 'advanced',
      required: skillData?.requirement || 'required'
    };
  };

  const getSkillCompetencyState = (skillName: string, levelKey: string = 'p4'): SkillCompetencyState | null => {
    console.log('Reading competency state:', { skillName, levelKey, roleId });
    
    if (!toggledSkills.has(skillName)) {
      console.log('Skill not toggled:', skillName);
      return null;
    }

    if (!roleId) {
      console.error('No role ID provided');
      return getDefaultState(skillName);
    }

    const roleStates = currentStates[roleId];
    if (!roleStates || !roleStates[skillName]) {
      console.log('No state found for skill:', skillName);
      return getDefaultState(skillName);
    }

    // Normalize level key to lowercase for consistency
    const normalizedLevelKey = levelKey.toLowerCase();
    const levelState = roleStates[skillName][normalizedLevelKey];

    if (!levelState) {
      console.log('No level state found for skill:', { skillName, levelKey: normalizedLevelKey });
      return getDefaultState(skillName);
    }

    console.log('Found competency state:', { skillName, levelKey: normalizedLevelKey, state: levelState });
    return {
      level: levelState.level || getDefaultState(skillName).level,
      required: levelState.required || getDefaultState(skillName).required
    };
  };

  const getAllSkillStatesForLevel = (levelKey: string = 'p4'): Record<string, SkillCompetencyState> => {
    console.log('Getting all skill states for level:', levelKey);
    const states: Record<string, SkillCompetencyState> = {};
    
    if (!roleId) {
      console.error('No role ID provided');
      return states;
    }

    const roleStates = currentStates[roleId];
    const roleData = roleSkills[roleId as keyof typeof roleSkills];
    
    if (roleData) {
      const allSkills = [
        ...roleData.specialized,
        ...roleData.common,
        ...roleData.certifications
      ];

      allSkills.forEach(skill => {
        if (toggledSkills.has(skill.title)) {
          const competencyState = getSkillCompetencyState(skill.title, levelKey);
          if (competencyState) {
            states[skill.title] = competencyState;
          }
        }
      });
    }

    console.log('Retrieved all skill states:', states);
    return states;
  };

  return {
    getSkillCompetencyState,
    getAllSkillStatesForLevel
  };
};