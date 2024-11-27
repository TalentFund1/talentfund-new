import { Track } from './skillImportance';

interface SkillState {
  level: string;
  required: string;
}

export const generateProgressionForTrack = (
  progressionPoint: number,
  importance: number,
  track: Track
): SkillState => {
  let skillLevel: string;
  let requirement: string;

  // For managerial track, start with higher baseline levels
  if (track === "Managerial") {
    if (importance >= 3) { // Core or critical skills
      skillLevel = progressionPoint <= 0.3 ? "intermediate" : "advanced";
      requirement = "required";
    } else { // Other skills
      if (progressionPoint <= 0.3) {
        skillLevel = "intermediate";
        requirement = "preferred";
      } else if (progressionPoint <= 0.6) {
        skillLevel = "intermediate";
        requirement = "required";
      } else {
        skillLevel = "advanced";
        requirement = "required";
      }
    }
  } else {
    // Professional track progression
    if (importance >= 3) { // Core or critical skills
      if (progressionPoint <= 0.2) {
        skillLevel = "intermediate";
        requirement = "required";
      } else {
        skillLevel = "advanced";
        requirement = "required";
      }
    } else if (importance === 2) { // Specialized skills
      if (progressionPoint <= 0.3) {
        skillLevel = "beginner";
        requirement = "preferred";
      } else if (progressionPoint <= 0.6) {
        skillLevel = "intermediate";
        requirement = "required";
      } else {
        skillLevel = "advanced";
        requirement = "required";
      }
    } else { // Common skills and others
      if (progressionPoint <= 0.3) {
        skillLevel = "beginner";
        requirement = "preferred";
      } else if (progressionPoint <= 0.6) {
        skillLevel = "intermediate";
        requirement = "preferred";
      } else {
        skillLevel = "advanced";
        requirement = "required";
      }
    }
  }

  return { skillLevel, requirement };
};