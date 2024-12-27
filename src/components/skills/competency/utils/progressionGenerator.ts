import { Track } from '../../types/sharedSkillTypes';

interface ProgressionResult {
  level: string;
  required: string;
}

export const generateProgressionForTrack = (
  progressionPoint: number,
  importance: number,
  track: Track
): ProgressionResult => {
  // Determine level based on progression point and importance
  let level: string;
  if (progressionPoint >= 0.75) {
    level = 'advanced';
  } else if (progressionPoint >= 0.5) {
    level = 'intermediate';
  } else if (progressionPoint >= 0.25) {
    level = 'beginner';
  } else {
    level = 'unspecified';
  }

  // Determine requirement based on track and importance
  let required = 'preferred';
  if (track === "Managerial" && importance > 2) {
    required = 'required';
  }

  console.log('Generated progression:', {
    progressionPoint,
    importance,
    track,
    level,
    required
  });

  return { level, required };
};