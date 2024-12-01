export const determineRequirement = (levelKey: string, track: string): string => {
  if (track === "Managerial") {
    const level = parseInt(levelKey.replace(/[^\d]/g, ''));
    // For managerial track, all skills are typically required
    return level >= 3 ? "required" : "preferred";
  }
  
  // For professional track
  const level = parseInt(levelKey.replace(/[^\d]/g, ''));
  return level >= 4 ? "required" : "preferred";
};