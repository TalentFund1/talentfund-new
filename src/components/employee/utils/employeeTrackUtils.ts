export type EmployeeTrack = "Professional" | "Managerial";

export const getEmployeeTrack = (role: string): EmployeeTrack => {
  const level = role.split(":")[1]?.trim();
  
  if (!level) return "Professional";
  
  // Check if level starts with M or m (M3-M6)
  if (level.toLowerCase().startsWith("m")) {
    return "Managerial";
  }
  
  // Default to Professional track (P1-P6)
  return "Professional";
};

export const formatLevel = (level: string): string => {
  if (!level) return "";
  
  const cleanLevel = level.trim().toLowerCase();
  // Capitalize first letter for display
  return cleanLevel.charAt(0).toUpperCase() + cleanLevel.slice(1);
};