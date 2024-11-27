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
  console.log(`Generating progression for ${skillName} in ${category} for ${track} track`);
  
  const levels = track === "Professional" ? Object.keys(professionalLevels) : Object.keys(managerialLevels);
  const progression: Record<string, SkillState> = {};

  // Helper function to determine skill importance
  const getSkillImportance = (skillName: string, category: string, roleId: string): number => {
    // Core skills that are fundamental to any role
    const coreSkills = ["Problem Solving", "Technical Writing", "Code Review"];
    
    // Role-specific critical skills
    const criticalSkillsByRole: Record<string, string[]> = {
      "123": ["Machine Learning", "Deep Learning", "Natural Language Processing"], // AI Engineer
      "124": ["Node.js", "Database Design", "API Development"], // Backend Engineer
      "125": ["React", "TypeScript", "Next.js"], // Frontend Engineer
      "126": ["System Design", "Technical Architecture", "Team Leadership"] // Engineering Manager
    };

    if (coreSkills.includes(skillName)) return 3; // Core skills
    if (criticalSkillsByRole[roleId]?.includes(skillName)) return 4; // Role-critical skills
    if (category === "specialized") return 2; // Specialized but not critical
    if (category === "certification") return 1; // Certifications
    return 0; // Common skills
  };

  const importance = getSkillImportance(skillName, category, roleId);
  console.log(`Skill importance for ${skillName}: ${importance}`);

  // Generate progression based on importance and level
  levels.forEach((level, index) => {
    let skillLevel: string;
    let requirement: string;

    // Determine skill level based on importance and career stage
    switch (importance) {
      case 4: // Role-critical skills
        if (index <= 1) skillLevel = "beginner";
        else if (index <= 3) skillLevel = "intermediate";
        else skillLevel = "advanced";
        requirement = index >= 2 ? "required" : "preferred";
        break;

      case 3: // Core skills
        if (index === 0) skillLevel = "beginner";
        else if (index <= 2) skillLevel = "intermediate";
        else skillLevel = "advanced";
        requirement = index >= 3 ? "required" : "preferred";
        break;

      case 2: // Specialized skills
        if (index <= 2) skillLevel = "unspecified";
        else if (index <= 4) skillLevel = "intermediate";
        else skillLevel = "advanced";
        requirement = index >= 4 ? "required" : "preferred";
        break;

      case 1: // Certifications
        if (index <= 3) skillLevel = "unspecified";
        else if (index === 4) skillLevel = "intermediate";
        else skillLevel = "advanced";
        requirement = index >= 5 ? "required" : "preferred";
        break;

      default: // Common skills
        if (index <= 1) skillLevel = "unspecified";
        else if (index <= 3) skillLevel = "beginner";
        else if (index <= 4) skillLevel = "intermediate";
        else skillLevel = "advanced";
        requirement = index >= 5 ? "required" : "preferred";
    }

    console.log(`Generated level for ${skillName} at ${level}: ${skillLevel} (${requirement})`);
    
    progression[level.toLowerCase()] = {
      level: skillLevel,
      required: requirement
    };
  });

  return progression;
};