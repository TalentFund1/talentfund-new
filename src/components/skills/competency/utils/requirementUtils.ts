export const determineRequirement = (levelKey: string, track: string): string => {
  const key = levelKey.toLowerCase();
  
  // For managerial track, all skills are required
  if (track === "Managerial") {
    return "required";
  }

  // For professional track, requirements vary by level
  const levelNumber = parseInt(key.replace('p', ''));
  
  // P4 and above skills are required
  if (levelNumber >= 4) {
    return "required";
  }
  
  // Lower level skills are preferred
  return "preferred";
};