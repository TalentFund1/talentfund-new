import { aiSkills } from '../../data/skills/aiSkills';
import { backendSkills } from '../../data/skills/backendSkills';
import { commonSkills } from '../../data/skills/commonSkills';
import { certificationSkills } from '../../data/skills/certificationSkills';
import { SkillState } from '../types/CompetencyTypes';

export const initializeSkillStates = (roleId: string) => {
  console.log('Initializing competency states for role:', roleId);
  
  const states: Record<string, Record<string, SkillState>> = {};
  
  const allSkills = [
    ...aiSkills,
    ...backendSkills,
    ...commonSkills,
    ...certificationSkills
  ];

  allSkills.forEach(skill => {
    states[skill.title] = {};
    
    if (skill.professionalTrack) {
      Object.entries(skill.professionalTrack).forEach(([level, state]) => {
        states[skill.title][level.toLowerCase()] = {
          level: state.level,
          required: state.requirement
        };
      });
    }
    
    if (skill.managerialTrack) {
      Object.entries(skill.managerialTrack).forEach(([level, state]) => {
        states[skill.title][level.toLowerCase()] = {
          level: state.level,
          required: state.requirement
        };
      });
    }
  });

  console.log('Initialized default states:', states);
  return states;
};