export const getSkillProfileId = (role: string): string => {
  const roleMapping: { [key: string]: string } = {
    "AI Engineer": "123",
    "Backend Engineer": "124",
    "Frontend Engineer": "125",
    "Engineering Manager": "126"
  };

  const baseRole = getBaseRole(role);
  return roleMapping[baseRole] || "123"; // Default to AI Engineer if no match
};

export const getBaseRole = (role: string): string => {
  return role.split(':')[0].trim();
};

export const getLevel = (role: string): string => {
  const parts = role.split(':');
  if (parts.length > 1) {
    return parts[1].trim().toLowerCase();
  }
  return 'p4'; // Default level if not specified
};