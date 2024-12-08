import { roleSkills } from '../../data/roleSkills';
import { RoleState } from './types';

export const initializeRoleState = (roleId: string): RoleState => {
  console.log('Initializing new state for role:', roleId);
  
  const currentRoleSkills = roleSkills[roleId as keyof typeof roleSkills];
  if (!currentRoleSkills) {
    console.warn('No skills found for role:', roleId);
    return {};
  }

  const allSkills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ];

  const initialStates: RoleState = {};
  const professionalLevels = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'];
  const managerialLevels = ['m3', 'm4', 'm5', 'm6'];
  
  allSkills.forEach(skill => {
    initialStates[skill.title] = {};
    
    // Determine which levels to use based on role type
    const isManagerial = currentRoleSkills.title?.toLowerCase().includes('manager');
    const levels = isManagerial ? managerialLevels : professionalLevels;
    
    levels.forEach(level => {
      console.log('Initializing level state:', {
        skill: skill.title,
        level,
        state: { level: 'unspecified', required: 'preferred' }
      });
      
      initialStates[skill.title][level] = {
        level: 'unspecified',
        required: 'preferred'
      };
    });
  });

  console.log('Initialized states with unspecified/preferred defaults:', initialStates);
  return initialStates;
};