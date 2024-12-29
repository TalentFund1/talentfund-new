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

      // Base progression for all skills starts at unspecified
      skillLevel = 'unspecified';
      required = 'preferred';

      // Critical skills (importance >= 3)
      if (importance >= 3) {
        if (levelNumber >= 5) {
          skillLevel = 'advanced';
          required = 'required';
        } else if (levelNumber >= 3) {
          skillLevel = 'intermediate';
          required = 'required';
        } else if (levelNumber >= 1) {
          skillLevel = 'beginner';
          required = 'preferred';
        }
      }
      // Important skills (importance >= 2)
      else if (importance >= 2) {
        if (levelNumber >= 5) {
          skillLevel = 'advanced';
          required = 'required';
        } else if (levelNumber >= 4) {
          skillLevel = 'intermediate';
          required = 'required';
        } else if (levelNumber >= 2) {
          skillLevel = 'beginner';
          required = 'preferred';
        }
      }
      // Regular skills (importance < 2)
      else {
        if (levelNumber >= 6) {
          skillLevel = 'advanced';
          required = 'preferred';
        } else if (levelNumber >= 4) {
          skillLevel = 'intermediate';
          required = 'preferred';
        } else if (levelNumber >= 2) {
          skillLevel = 'beginner';
          required = 'preferred';
        }
      }

      console.log(`Generated level for ${skillName} at ${level}: ${skillLevel} (${required})`);
      
      progression[level.toLowerCase()] = {
        level: skillLevel,
        required
      };
    });
  } else {
    // For Managerial track
    levels.forEach((level) => {
      const levelNumber = parseInt(level.replace('m', ''));
      let skillLevel: string;
      let required: string;

      // Base state
      skillLevel = 'unspecified';
      required = 'preferred';

      // Critical skills (importance >= 3)
      if (importance >= 3) {
        if (levelNumber >= 5) {
          skillLevel = 'advanced';
          required = 'required';
        } else if (levelNumber >= 4) {
          skillLevel = 'intermediate';
          required = 'required';
        } else {
          skillLevel = 'beginner';
          required = 'preferred';
        }
      }
      // Important skills (importance >= 2)
      else if (importance >= 2) {
        if (levelNumber >= 6) {
          skillLevel = 'advanced';
          required = 'required';
        } else if (levelNumber >= 4) {
          skillLevel = 'intermediate';
          required = 'preferred';
        } else {
          skillLevel = 'beginner';
          required = 'preferred';
        }
      }
      // Regular skills
      else {
        if (levelNumber >= 6) {
          skillLevel = 'intermediate';
          required = 'preferred';
        } else if (levelNumber >= 4) {
          skillLevel = 'beginner';
          required = 'preferred';
        }
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