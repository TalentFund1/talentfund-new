import { roleSkills } from '../../data/roleSkills';
import { SkillCompetencyState, defaultState } from './CompetencyStateTypes';

export class StaticCompetencyReader {
  static getSkillCompetencyState(
    skillName: string, 
    levelKey: string = 'p4',
    roleId: string
  ): SkillCompetencyState {
    console.log('Static reader getting competency state:', {
      skillName,
      levelKey,
      roleId
    });

    const roleData = roleSkills[roleId as keyof typeof roleSkills];
    if (!roleData) {
      console.warn('No role data found for:', roleId);
      return defaultState;
    }

    const allSkills = [
      ...roleData.specialized,
      ...roleData.common,
      ...roleData.certifications
    ];

    const skillData = allSkills.find(s => s.title === skillName);
    if (!skillData) {
      console.warn('No skill data found for:', skillName);
      return defaultState;
    }

    return {
      level: skillData.level || 'unspecified',
      required: 'required'
    };
  }
}