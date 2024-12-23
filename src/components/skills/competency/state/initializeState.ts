import { RoleState } from '../../../../types/skillTypes';
import { roleSkills } from '../../data/roleSkills';

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
  
  allSkills.forEach(skill => {
    initialStates[skill.title] = {};
    ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'm3', 'm4', 'm5', 'm6'].forEach(level => {
      initialStates[skill.title][level] = {
        id: skill.title,
        skillId: skill.title,
        roleId: roleId,
        level: 'unspecified',
        requirement: 'preferred'
      };
    });
  });

  return initialStates;
};