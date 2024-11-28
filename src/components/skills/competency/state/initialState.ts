import { aiSkills } from '../../data/skills/aiSkills';
import { backendSkills } from '../../data/skills/backendSkills';
import { commonSkills } from '../../data/skills/commonSkills';
import { certificationSkills } from '../../data/skills/certificationSkills';

export const getStorageKey = (roleId: string) => `competency-states-${roleId}`;

export const initializeSkillStates = (roleId: string) => {
  console.log('Initializing competency states for role:', roleId);
  const states: Record<string, Record<string, any>> = {};
  
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

  const allSkills = [
    ...aiSkills,
    ...backendSkills,
    ...commonSkills,
    ...certificationSkills
  ];

  console.log('Initializing with unspecified states for role:', roleId);
  allSkills.forEach(skill => {
    states[skill.title] = states[skill.title] || {};
    
    if (skill.professionalTrack) {
      Object.keys(skill.professionalTrack).forEach(level => {
        states[skill.title][level.toLowerCase()] = {
          level: 'unspecified',
          required: 'preferred'
        };
      });
    }
    
    if (skill.managerialTrack) {
      Object.keys(skill.managerialTrack).forEach(level => {
        states[skill.title][level.toLowerCase()] = {
          level: 'unspecified',
          required: 'preferred'
        };
      });
    }
  });

  return states;
};