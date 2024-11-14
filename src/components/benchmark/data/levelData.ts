export type ProfessionalLevel = "P1" | "P2" | "P3" | "P4" | "P5" | "P6";
export type ManagerialLevel = "M3" | "M4" | "M5" | "M6";
export type Level = ProfessionalLevel | ManagerialLevel;

export const professionalLevels: Record<string, ProfessionalLevel> = {
  "p1": "P1",
  "p2": "P2",
  "p3": "P3",
  "p4": "P4",
  "p5": "P5",
  "p6": "P6"
};

export const managerialLevels: Record<string, ManagerialLevel> = {
  "m3": "M3",
  "m4": "M4",
  "m5": "M5",
  "m6": "M6"
};

export const getLevelsForTrack = (track: "Professional" | "Managerial"): Level[] => {
  return track === "Professional" 
    ? Object.values(professionalLevels)
    : Object.values(managerialLevels);
};