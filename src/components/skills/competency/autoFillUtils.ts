import { professionalLevels, managerialLevels } from "../../benchmark/data/levelData";

const getSkillLevelForPosition = (
  position: number, 
  totalPositions: number,
  category: string
): { level: string; required: string } => {
  console.log('Determining skill level for:', { position, totalPositions, category });
  
  // Calculate relative position (0-1)
  const relativePosition = position / totalPositions;
  
  let level: string;
  let required: string = "required";

  if (category === "specialized") {
    if (relativePosition >= 0.8) {
      level = "advanced";
    } else if (relativePosition >= 0.4) {
      level = "intermediate";
    } else {
      level = "beginner";
    }
  } else if (category === "common") {
    if (relativePosition >= 0.7) {
      level = "intermediate";
    } else if (relativePosition >= 0.9) {
      level = "advanced";
    } else {
      level = "beginner";
    }
    required = "preferred";
  } else { // certification
    if (relativePosition >= 0.8) {
      level = "advanced";
    } else if (relativePosition >= 0.5) {
      level = "intermediate";
    } else {
      level = "beginner";
    }
    required = "preferred";
  }

  console.log('Generated level and requirement:', { level, required });
  return { level, required };
};

export const generateSkillProgression = (
  skillName: string,
  category: string,
  track: "Professional" | "Managerial",
  roleId: string
): Record<string, { level: string; required: string }> => {
  console.log('Generating skill progression:', { skillName, category, track, roleId });
  
  const levels = track === "Professional" ? professionalLevels : managerialLevels;
  const progression: Record<string, { level: string; required: string }> = {};
  const levelKeys = Object.keys(levels);

  try {
    levelKeys.forEach((levelKey, index) => {
      const normalizedKey = levelKey.toLowerCase();
      const { level, required } = getSkillLevelForPosition(
        index + 1, 
        levelKeys.length,
        category
      );

      progression[normalizedKey] = {
        level,
        required
      };

      console.log('Generated progression for level:', { 
        levelKey: normalizedKey, 
        level, 
        required 
      });
    });

    return progression;
  } catch (error) {
    console.error('Error generating progression:', error);
    throw new Error(`Failed to generate progression for ${skillName}: ${error}`);
  }
};