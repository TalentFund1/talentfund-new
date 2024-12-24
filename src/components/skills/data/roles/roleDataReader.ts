import { roleSkills } from '../roleSkills';
import { RoleSkillData, UnifiedSkill } from '../../types/SkillTypes';

export const getRoleData = (roleId: string): Readonly<RoleSkillData> | undefined => {
  console.log('Getting role data for:', roleId);
  const roleData = roleSkills[roleId as keyof typeof roleSkills];
  
  if (!roleData) {
    console.warn('No role data found for role:', roleId);
    return undefined;
  }

  // Return as readonly to enforce immutability
  return Object.freeze({ ...roleData });
};

export const getRoleSkills = (roleId: string): ReadonlyArray<UnifiedSkill> => {
  const roleData = getRoleData(roleId);
  if (!roleData) return [];

  console.log('Getting skills for role:', {
    roleId,
    skillCount: {
      specialized: roleData.specialized.length,
      common: roleData.common.length,
      certifications: roleData.certifications.length
    }
  });

  // Return all skills as a readonly array
  return Object.freeze([
    ...roleData.specialized,
    ...roleData.common,
    ...roleData.certifications
  ]);
};

export const getRoleRequiredSkills = (roleId: string): ReadonlyArray<UnifiedSkill> => {
  const skills = getRoleSkills(roleId);
  return Object.freeze(
    skills.filter(skill => skill.goalStatus === 'required')
  );
};