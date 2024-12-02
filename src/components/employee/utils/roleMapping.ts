import { roleSkills } from '../../skills/data/roleSkills';

export type RoleId = keyof typeof roleSkills;

// Define role aliases
const roleAliases: Record<string, RoleId> = {
  "Frontend Developer": "125",
  // Add more aliases here as needed
};

// Create a mapping of role titles to IDs
const createRoleMap = () => {
  const baseMap = Object.entries(roleSkills).reduce((acc, [id, data]) => {
    acc[data.title] = id;
    return acc;
  }, {} as Record<string, RoleId>);

  // Merge with aliases
  return { ...baseMap, ...roleAliases };
};

const roleMap = createRoleMap();

export const getSkillProfileId = (role?: string): RoleId | '' => {
  if (!role) {
    console.warn('No role provided to getSkillProfileId');
    return '';
  }

  // Validate role ID format first
  const validProfileIds = Object.keys(roleSkills);
  if (validProfileIds.includes(role)) {
    console.log('Using direct role ID:', role);
    return role as RoleId;
  }

  const baseRole = role.split(":")[0].trim();
  const mappedId = roleMap[baseRole] as RoleId;
  
  console.log('Role mapping:', { 
    originalRole: role,
    baseRole,
    mappedId
  });
  
  return mappedId || '';
};

export const getBaseRole = (role?: string): string => {
  if (!role) return "";
  return role.split(":")[0].trim();
};

export const getLevel = (role?: string): string => {
  if (!role) return "";
  const parts = role.split(":");
  return parts.length > 1 ? parts[1].trim() : "";
};

// Export the role mapping for reference
export const getRoleMap = () => roleMap;

// Get role title from ID
export const getRoleTitle = (id: RoleId): string => {
  return roleSkills[id]?.title || '';
};