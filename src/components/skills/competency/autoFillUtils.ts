import { professionalLevels, managerialLevels } from "../../benchmark/data/levelData";

const getSkillLevelForPosition = (
  position: number, 
  totalPositions: number,
  category: string,
  skillName: string
): { level: string; required: string } => {
  console.log('Determining skill level for:', { position, totalPositions, category, skillName });
  
  // Calculate relative position (0-1)
  const relativePosition = position / totalPositions;
  
  let level: string;
  let required: string;

  // Specialized skills progress faster to advanced and are more likely to be required
  if (category === "specialized") {
    if (relativePosition <= 0.3) {
      level = "intermediate";
      required = "preferred";
    } else {
      level = "advanced";
      required = "required";
    }
  } 
  // Common skills progress more gradually
  else if (category === "common") {
    if (relativePosition <= 0.3) {
      level = "beginner";
      required = "preferred";
    } else if (relativePosition <= 0.6) {
      level = "intermediate";
      required = "preferred";
    } else {
      level = "advanced";
      required = "required";
    }
  }
  // Certifications follow a similar pattern to common skills
  else {
    if (relativePosition <= 0.3) {
      level = "beginner";
      required = "preferred";
    } else if (relativePosition <= 0.6) {
      level = "intermediate";
      required = "preferred";
    } else {
      level = "advanced";
      required = "required";
    }
  }

  console.log('Generated level and requirement:', { level, required, skillName, position });
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
        category,
        skillName
      );

      progression[normalizedKey] = {
        level,
        required
      };

      console.log('Generated progression for level:', { 
        skillName,
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