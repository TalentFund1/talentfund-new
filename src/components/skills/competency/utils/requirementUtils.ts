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

// Helper function to get the numeric value of a level
export const getLevelValue = (level: string): number => {
  const match = level.toLowerCase().match(/[mp](\d+)/);
  return match ? parseInt(match[1]) : 0;
};

// Helper function to determine if a level should be mapped to managerial
export const shouldMapToManagerial = (level: string): boolean => {
  const value = getLevelValue(level);
  return value >= 4; // P4 and above map to managerial
};