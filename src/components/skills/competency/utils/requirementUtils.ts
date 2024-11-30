export const determineRequirement = (levelKey: string, track: string): string => {
  if (track === "Professional") {
    const level = parseInt(levelKey.replace(/[^\d]/g, ''));
    return level >= 4 ? "required" : "preferred";
  }
  if (track === "Managerial") {
    const level = parseInt(levelKey.replace(/[^\d]/g, ''));
    return level >= 5 ? "required" : "preferred";
  }
  return "preferred";
};