export type EmployeeTrack = "Professional" | "Managerial";

export const getEmployeeTrack = (role: string): EmployeeTrack => {
  const level = role.split(":")[1]?.trim();
  
  if (!level) return "Professional";
  
  // Check if level starts with M (M3-M6)
  if (level.startsWith("M")) {
    return "Managerial";
  }
  
  // Default to Professional track (P1-P6)
  return "Professional";
};