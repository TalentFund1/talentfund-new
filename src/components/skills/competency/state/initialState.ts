import { roleSkills } from '../../data/roleSkills';
import { SkillState } from './types';

export const getStorageKey = (roleId: string) => `competency-states-${roleId}`;

export const initializeSkillStates = (roleId: string) => {
  console.log('Initializing competency states for role:', roleId);
  const states: Record<string, Record<string, SkillState>> = {};
  
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills] || roleSkills["123"];
  const allSkills = [
    ...(currentRoleSkills.specialized || []),
    ...(currentRoleSkills.common || []),
    ...(currentRoleSkills.certifications || [])
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
    states[skill.title] = {};
    
    ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'].forEach(level => {
      states[skill.title][level] = {
        level: 'unspecified',
        required: 'preferred',
        requirement: 'preferred'
      };
    });
    
    ['m3', 'm4', 'm5', 'm6'].forEach(level => {
      states[skill.title][level] = {
        level: 'unspecified',
        required: 'preferred',
        requirement: 'preferred'
      };
    });
  });

  return states;
};