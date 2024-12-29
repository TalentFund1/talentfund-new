import { getSkillImportance } from './utils/skillImportance';
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
  
  const progression: Record<string, SkillState> = {};
  const importance = getSkillImportance(skillName, category, track, roleId);
  const levels = track === "Professional" ? Object.keys(professionalLevels) : Object.keys(managerialLevels);

  console.log(`Skill importance for ${skillName}: ${importance}`);

  // For Professional track, generate progression based on level and importance
  if (track === "Professional") {
    levels.forEach((level) => {
      const levelNumber = parseInt(level.replace('p', ''));
      let skillLevel: string;
      let required: string;

      // Determine skill level based on professional level progression
      if (levelNumber <= 2) {
        skillLevel = 'beginner';
      } else if (levelNumber <= 4) {
        skillLevel = 'intermediate';
      } else {
        skillLevel = 'advanced';
      }

      // Adjust based on skill importance
      if (importance >= 3) {
        // Critical skills progress faster
        if (levelNumber >= 5) {
          skillLevel = 'advanced';
        } else if (levelNumber >= 3) {
          skillLevel = 'intermediate';
        }
        required = 'required';
      } else if (importance >= 2) {
        // Important skills
        if (levelNumber >= 5) {
          skillLevel = 'advanced';
        }
        required = levelNumber >= 4 ? 'required' : 'preferred';
      } else {
        // Regular skills
        required = 'preferred';
      }

      console.log(`Generated level for ${skillName} at ${level}: ${skillLevel} (${required})`);
      
      progression[level.toLowerCase()] = {
        level: skillLevel,
        required
      };
    });
  } else {
    // For Managerial track, maintain existing logic
    levels.forEach((level, index) => {
      const levelNumber = parseInt(level.replace('m', ''));
      let skillLevel: string;
      let required: string;

      if (levelNumber >= 5) {
        skillLevel = 'advanced';
        required = importance >= 2 ? 'required' : 'preferred';
      } else if (levelNumber >= 4) {
        skillLevel = 'intermediate';
        required = 'preferred';
      } else {
        skillLevel = 'beginner';
        required = 'preferred';
      }

      console.log(`Generated level for ${skillName} at ${level}: ${skillLevel} (${required})`);
      
      progression[level.toLowerCase()] = {
        level: skillLevel,
        required
      };
    });
  }

  return progression;
};