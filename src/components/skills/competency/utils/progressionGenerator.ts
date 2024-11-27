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
  let level: string;
  let required: string;

  // For managerial track, start with higher baseline levels
  if (track === "Managerial") {
    if (importance >= 3) { // Core or critical skills
      level = progressionPoint <= 0.3 ? "intermediate" : "advanced";
      required = "required";
    } else { // Other skills
      if (progressionPoint <= 0.3) {
        level = "intermediate";
        required = "preferred";
      } else if (progressionPoint <= 0.6) {
        level = "intermediate";
        required = "required";
      } else {
        level = "advanced";
        required = "required";
      }
    }
  } else {
    // Professional track progression
    if (importance >= 3) { // Core or critical skills
      if (progressionPoint <= 0.2) {
        level = "intermediate";
        required = "required";
      } else {
        level = "advanced";
        required = "required";
      }
    } else if (importance === 2) { // Specialized skills
      if (progressionPoint <= 0.3) {
        level = "beginner";
        required = "preferred";
      } else if (progressionPoint <= 0.6) {
        level = "intermediate";
        required = "required";
      } else {
        level = "advanced";
        required = "required";
      }
    } else { // Common skills and others
      if (progressionPoint <= 0.3) {
        level = "beginner";
        required = "preferred";
      } else if (progressionPoint <= 0.6) {
        level = "intermediate";
        required = "preferred";
      } else {
        level = "advanced";
        required = "required";
      }
    }
  }

  return { level, required };
};