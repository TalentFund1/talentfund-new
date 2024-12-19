import { getSkillImportance } from './utils/skillImportance';
import { generateProgressionForTrack } from './utils/progressionGenerator';
import { professionalLevels, managerialLevels } from "../../benchmark/data/levelData";

interface SkillState {
  level: string;
  required: string;
}

export const generateSkillProgression = (
  skillName: string,
  category: string,
  track: "Professional" | "Managerial",
  roleId: string
): Record<string, SkillState> => {
  console.log(`Generating progression for ${skillName} (${track} track)`);
  
  // For newly added skills, return default values
  const progression: Record<string, SkillState> = {};
  const levels = track === "Professional" ? Object.keys(professionalLevels) : Object.keys(managerialLevels);

  // Initialize all levels with unspecified/preferred
  levels.forEach(level => {
    progression[level.toLowerCase()] = {
      level: 'unspecified',
      required: 'preferred'
    };
  });

  console.log(`Generated default progression for new skill ${skillName}:`, progression);
  return progression;
};