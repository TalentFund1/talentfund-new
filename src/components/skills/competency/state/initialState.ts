import { aiSkills } from '../../data/skills/aiSkills';
import { backendSkills } from '../../data/skills/backendSkills';
import { commonSkills } from '../../data/skills/commonSkills';
import { certificationSkills } from '../../data/skills/certificationSkills';

export const getStorageKey = (roleId: string) => `competency-states-${roleId}`;

export const initializeSkillStates = (roleId: string) => {
  console.log('Initializing competency states for role:', roleId);
  const states: Record<string, Record<string, any>> = {};
  
  const allSkills = [
    ...aiSkills,
    ...backendSkills,
    ...commonSkills,
    ...certificationSkills
  ];

  const storageKey = getStorageKey(roleId);
  const savedStates = localStorage.getItem(storageKey);
  
  if (savedStates) {
    try {
      const parsedStates = JSON.parse(savedStates);
      if (parsedStates && typeof parsedStates === 'object') {
        console.log('Successfully loaded saved states for role:', roleId);
        return parsedStates;
      }
    } catch (error) {
      console.error('Error parsing saved states for role:', roleId, error);
    }
  }

  console.log('Initializing with default states for role:', roleId);
  allSkills.forEach(skill => {
    states[skill.title] = states[skill.title] || {};
    
    if (skill.professionalTrack) {
      Object.entries(skill.professionalTrack).forEach(([level, state]) => {
        states[skill.title][level.toLowerCase()] = {
          level: state.level || 'unspecified',
          required: state.requirement || 'preferred'
        };
      });
    }
    
    if (skill.managerialTrack) {
      Object.entries(skill.managerialTrack).forEach(([level, state]) => {
        states[skill.title][level.toLowerCase()] = {
          level: state.level || 'unspecified',
          required: state.requirement || 'preferred'
        };
      });
    }
  });

  return states;
};