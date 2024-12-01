export const roleMap: { [key: string]: string } = {
  "Backend Engineer": "124",
  "AI Engineer": "123",
  "Frontend Engineer": "125",
  "Engineering Manager": "126",
  "Data Engineer": "127",
  "DevOps Engineer": "128",
  "Product Manager": "129",
  "Frontend Developer": "125"  // Alias for Frontend Engineer
};

export const getSkillProfileId = (role?: string) => {
  if (!role) return "123"; // Default profile ID if role is undefined

  // Validate role ID format first
  const validProfileIds = Object.values(roleMap);
  if (validProfileIds.includes(role)) {
    console.log('Using direct role ID:', role);
    return role;
  }

  // Map role titles to IDs with consistent structure
  const baseRole = role.split(":")[0].trim();
  const mappedId = roleMap[baseRole];
  
  console.log('Role mapping:', { 
    originalRole: role,
    baseRole,
    mappedId
  });
  
  return mappedId || "123"; // Return default if no mapping found
};

export const getBaseRole = (role?: string) => {
  if (!role) return "";
  return role.split(":")[0].trim();
};

export const getLevel = (role?: string) => {
  if (!role) return "";
  const parts = role.split(":");
  return parts.length > 1 ? parts[1].trim() : "";
};