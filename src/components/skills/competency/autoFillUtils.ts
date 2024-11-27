import { professionalLevels, managerialLevels } from "../../benchmark/data/levelData";

export const generateSkillProgression = (
  skillName: string,
  category: string,
  track: "Professional" | "Managerial",
  roleId: string
): Record<string, { level: string; required: string }> => {
  console.log('Generating skill progression:', { skillName, category, track, roleId });
  
  const levels = track === "Professional" ? professionalLevels : managerialLevels;
  const progression: Record<string, { level: string; required: string }> = {};

  try {
    // Generate progression based on skill category and track
    Object.keys(levels).forEach((levelKey) => {
      const normalizedKey = levelKey.toLowerCase();
      let skillLevel: string;
      let requirement: string;

      // Determine skill level based on category and position in levels
      if (category === "specialized") {
        skillLevel = normalizedKey.includes("p5") || normalizedKey.includes("p6") ? "advanced" :
                    normalizedKey.includes("p3") || normalizedKey.includes("p4") ? "intermediate" : "beginner";
        requirement = "required";
      } else if (category === "common") {
        skillLevel = normalizedKey.includes("p4") || normalizedKey.includes("p5") ? "intermediate" :
                    normalizedKey.includes("p6") ? "advanced" : "beginner";
        requirement = "required";
      } else {
        skillLevel = normalizedKey.includes("p5") || normalizedKey.includes("p6") ? "advanced" :
                    normalizedKey.includes("p4") ? "intermediate" : "beginner";
        requirement = "preferred";
      }

      progression[normalizedKey] = {
        level: skillLevel,
        required: requirement
      };
    });

    console.log('Generated progression:', { skillName, progression });
    return progression;
  } catch (error) {
    console.error('Error generating progression:', error);
    throw new Error(`Failed to generate progression for ${skillName}`);
  }
};