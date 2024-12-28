// Map of role IDs to their default tracks
const roleTrackMap: { [key: string]: "Professional" | "Managerial" } = {
  "126": "Managerial", // Engineering Manager
  "128": "Managerial", // Product Leader
};

export const getRoleDefaultTrack = (roleId: string | undefined): "Professional" | "Managerial" => {
  if (!roleId) {
    console.log('No roleId provided, defaulting to Professional track');
    return "Professional";
  }

  console.log('Getting track for role:', roleId, 'Current tracks:', roleTrackMap);
  return roleTrackMap[roleId] || "Professional";
};