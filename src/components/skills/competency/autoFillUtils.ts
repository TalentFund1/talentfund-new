import { professionalLevels, managerialLevels } from "../../benchmark/data/levelData";

type SkillProgression = {
  level: string;
  requirement: string;
};

export const generateSkillProgression = (
  skillName: string,
  category: string,
  track: "Professional" | "Managerial",
  roleId: string
): Record<string, SkillProgression> => {
  console.log(`Generating progression for ${skillName} in ${category} for ${track} track`);
  
  const levels = track === "Professional" ? Object.keys(professionalLevels) : Object.keys(managerialLevels);
  const progression: Record<string, SkillProgression> = {};

  // Define progression patterns based on skill category and importance
  const getProgressionPattern = (category: string, skillName: string): string[] => {
    const specializedPatterns = {
      "123": { // AI Engineer
        "Machine Learning": ["beginner", "intermediate", "advanced", "advanced", "advanced", "advanced"],
        "Deep Learning": ["unspecified", "beginner", "intermediate", "advanced", "advanced", "advanced"],
        "Natural Language Processing": ["unspecified", "unspecified", "unspecified", "unspecified", "intermediate", "unspecified"],
        "Computer Vision": ["unspecified", "unspecified", "unspecified", "unspecified", "advanced", "advanced"]
      },
      "124": { // Backend Engineer
        "Node.js": ["beginner", "intermediate", "advanced", "advanced", "advanced", "advanced"],
        "Database Design": ["beginner", "intermediate", "advanced", "advanced", "advanced", "advanced"],
        "API Development": ["beginner", "intermediate", "advanced", "advanced", "advanced", "advanced"],
        "System Architecture": ["unspecified", "beginner", "intermediate", "advanced", "advanced", "advanced"],
        "Kubernetes": ["unspecified", "beginner", "intermediate", "advanced", "advanced", "advanced"]
      }
    };

    const commonPatterns = {
      "Problem Solving": ["intermediate", "intermediate", "advanced", "advanced", "advanced", "advanced"],
      "Technical Writing": ["beginner", "intermediate", "intermediate", "advanced", "advanced", "advanced"],
      "Code Review": ["beginner", "intermediate", "advanced", "advanced", "advanced", "advanced"]
    };

    const certificationPatterns = {
      "AWS Certified Solutions Architect": ["unspecified", "beginner", "intermediate", "advanced", "advanced", "advanced"],
      "TensorFlow Developer Certificate": ["unspecified", "beginner", "intermediate", "advanced", "advanced", "advanced"],
      "Kubernetes Administrator": ["unspecified", "beginner", "intermediate", "advanced", "advanced", "advanced"]
    };

    if (category === "specialized" && specializedPatterns[roleId as keyof typeof specializedPatterns]?.[skillName]) {
      return specializedPatterns[roleId as keyof typeof specializedPatterns][skillName];
    }

    if (category === "common" && commonPatterns[skillName]) {
      return commonPatterns[skillName];
    }

    if (category === "certification" && certificationPatterns[skillName]) {
      return certificationPatterns[skillName];
    }

    // Default progression if no specific pattern is found
    return ["beginner", "intermediate", "advanced", "advanced", "advanced", "advanced"];
  };

  const pattern = getProgressionPattern(category, skillName);
  
  levels.forEach((level, index) => {
    const currentLevel = pattern[index] || "unspecified";
    const isRequired = currentLevel === "advanced" || 
                      (currentLevel === "intermediate" && index > 1) ||
                      (category === "specialized" && index > 1);
    
    progression[level.toLowerCase()] = {
      level: currentLevel,
      requirement: isRequired ? "required" : "preferred"
    };
  });

  console.log(`Generated progression for ${skillName}:`, progression);
  return progression;
};