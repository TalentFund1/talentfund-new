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

  // Helper function to determine skill importance for managerial track
  const getManagerialSkillImportance = (skillName: string, category: string, roleId: string): number => {
    // Core managerial skills that are fundamental
    const coreManagerialSkills = [
      "Team Leadership",
      "Project Management",
      "Strategic Planning",
      "Stakeholder Management"
    ];
    
    // Role-specific critical skills for Engineering Manager
    const criticalManagerialSkills: Record<string, string[]> = {
      "126": [ // Engineering Manager
        "System Design",
        "Technical Architecture",
        "Risk Management"
      ]
    };

    if (coreManagerialSkills.includes(skillName)) return 4; // Core managerial skills
    if (criticalManagerialSkills[roleId]?.includes(skillName)) return 3; // Role-critical skills
    if (category === "specialized") return 2; // Specialized but not critical
    if (category === "certification") return 1; // Certifications
    return 0; // Common skills
  };

  // Helper function to determine skill importance for professional track
  const getProfessionalSkillImportance = (skillName: string, category: string, roleId: string): number => {
    // Core skills that are fundamental to any role
    const coreProfessionalSkills = [
      "Problem Solving",
      "Technical Writing",
      "Code Review"
    ];
    
    // Role-specific critical skills
    const criticalSkillsByRole: Record<string, string[]> = {
      "123": ["Machine Learning", "Deep Learning", "Natural Language Processing"],
      "124": ["Node.js", "Database Design", "API Development"],
      "125": ["React", "TypeScript", "Next.js"],
      "126": ["System Design", "Technical Architecture", "Team Leadership"]
    };

    if (coreProfessionalSkills.includes(skillName)) return 3;
    if (criticalSkillsByRole[roleId]?.includes(skillName)) return 4;
    if (category === "specialized") return 2;
    if (category === "certification") return 1;
    return 0;
  };

  // Determine importance based on track
  const importance = track === "Managerial" 
    ? getManagerialSkillImportance(skillName, category, roleId)
    : getProfessionalSkillImportance(skillName, category, roleId);

  console.log(`Skill importance for ${skillName}: ${importance} (${track} track)`);

  // Generate progression based on importance and level for managerial track
  if (track === "Managerial") {
    levels.forEach((level, index) => {
      let skillLevel: string;
      let requirement: string;

      switch (importance) {
        case 4: // Core managerial skills
          if (index === 0) skillLevel = "intermediate";
          else skillLevel = "advanced";
          requirement = "required";
          break;

        case 3: // Role-critical skills
          if (index === 0) skillLevel = "intermediate";
          else if (index === 1) skillLevel = "intermediate";
          else skillLevel = "advanced";
          requirement = index >= 1 ? "required" : "preferred";
          break;

        case 2: // Specialized skills
          if (index === 0) skillLevel = "beginner";
          else if (index === 1) skillLevel = "intermediate";
          else skillLevel = "advanced";
          requirement = index >= 2 ? "required" : "preferred";
          break;

        case 1: // Certifications
          if (index <= 1) skillLevel = "unspecified";
          else if (index === 2) skillLevel = "intermediate";
          else skillLevel = "advanced";
          requirement = index >= 2 ? "required" : "preferred";
          break;

        default: // Common skills
          if (index === 0) skillLevel = "beginner";
          else if (index === 1) skillLevel = "intermediate";
          else skillLevel = "advanced";
          requirement = index >= 2 ? "required" : "preferred";
      }

      console.log(`Generated level for ${skillName} at ${level} (${track}): ${skillLevel} (${requirement})`);
      
      progression[level.toLowerCase()] = {
        level: skillLevel,
        required: requirement
      };
    });
  } else {
    // Keep existing professional track logic
    levels.forEach((level, index) => {
      let skillLevel: string;
      let requirement: string;

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

      console.log(`Generated level for ${skillName} at ${level} (${track}): ${skillLevel} (${requirement})`);
      
      progression[level.toLowerCase()] = {
        level: skillLevel,
        required: requirement
      };
    });
  }

  return progression;
};
