export const getSkillProfileId = (role: string): string => {
  const roleMap: { [key: string]: string } = {
    "AI Engineer": "123",
    "Backend Engineer": "124",
    "Frontend Engineer": "125",
    "Engineering Manager": "126"
  };

  const baseRole = getBaseRole(role);
  return roleMap[baseRole] || "123";
};

export const getBaseRole = (role: string): string => {
  return role.split(":")[0].trim();
};

export const getLevel = (role: string): string => {
  const parts = role.split(":");
  return parts[1]?.trim() || "P4";
};