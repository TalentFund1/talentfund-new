export const getSkillProfileId = (role?: string): string => {
  if (!role) {
    console.warn('No role provided to getSkillProfileId');
    return '';
  }
  return role.split(':')[0].trim();
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