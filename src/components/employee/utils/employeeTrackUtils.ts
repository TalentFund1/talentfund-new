import { roleSkills } from '../../skills/data/roleSkills';
import { getSkillProfileId } from '../../EmployeeTable';

export type EmployeeTrack = "Professional" | "Managerial";

export const getEmployeeTrack = (role: string): EmployeeTrack => {
  // First try to get track from roleSkills data
  const roleId = getSkillProfileId(role);
  const roleData = roleSkills[roleId as keyof typeof roleSkills];
  
  if (roleData?.roleTrack) {
    console.log('Track determined from roleSkills:', {
      role,
      roleId,
      track: roleData.roleTrack
    });
    return roleData.roleTrack;
  }
  
  // Fallback to determining from role level
  const level = role.split(":")[1]?.trim();
  console.log('Determining track from role level:', {
    role,
    level,
    roleId
  });
  
  if (!level) return "Professional";
  
  // Check if level starts with M (M3-M6)
  if (level.toLowerCase().startsWith("m")) {
    return "Managerial";
  }
  
  // Default to Professional track (P1-P6)
  return "Professional";
};