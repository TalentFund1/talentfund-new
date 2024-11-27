import { professionalLevels, managerialLevels } from "../../benchmark/data/levelData";

interface SkillState {
  level: string;
  required: string;
}

const getSkillImportance = (
  skillName: string, 
  category: string, 
  track: "Professional" | "Managerial",
  roleId: string
): number => {
  // Core skills that are fundamental to any role
  const coreSkills = {
    professional: [
      "Problem Solving",
      "Technical Writing",
      "Code Review"
    ],
    managerial: [
      "Team Leadership",
      "Project Management",
      "Strategic Planning",
      "Stakeholder Management",
      "Risk Management",
      "System Design",
      "Technical Architecture"
    ]
  };

  // Role-specific critical skills
  const criticalSkillsByRole: Record<string, string[]> = {
    "123": ["Machine Learning", "Deep Learning", "Natural Language Processing"],
    "124": ["Node.js", "Database Design", "API Development"],
    "125": ["React", "TypeScript", "Next.js"],
    "126": [
      "System Design", 
      "Technical Architecture", 
      "Risk Management",
      "Team Leadership",
      "Project Management",
      "Strategic Planning"
    ]
  };

  // Check if it's a core skill for the current track
  if (coreSkills[track.toLowerCase()].includes(skillName)) {
    console.log(`${skillName} identified as core ${track} skill`);
    return 4;
  }

  // Check if it's a role-critical skill
  if (criticalSkillsByRole[roleId]?.includes(skillName)) {
    console.log(`${skillName} identified as role-critical skill for role ${roleId}`);
    return 3;
  }

  // Category-based importance
  switch (category.toLowerCase()) {
    case 'specialized':
      return 2;
    case 'certification':
      return 1;
    default:
      return 0;
  }
};

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

  levels.forEach((level, index) => {
    let skillLevel: string;
    let requirement: string;

    // Normalize index to a 0-1 scale for progression calculation
    const progressionPoint = index / (levels.length - 1);

    // For managerial track, start with higher baseline levels
    if (track === "Managerial") {
      switch (importance) {
        case 4: // Core managerial skills
          if (progressionPoint <= 0.3) {
            skillLevel = "intermediate";
            requirement = "required";
          } else {
            skillLevel = "advanced";
            requirement = "required";
          }
          break;

        case 3: // Role-critical skills
          if (progressionPoint <= 0.3) {
            skillLevel = "intermediate";
            requirement = "required";
          } else {
            skillLevel = "advanced";
            requirement = "required";
          }
          break;

        case 2: // Specialized skills
          if (progressionPoint <= 0.3) {
            skillLevel = "intermediate";
            requirement = "required";
          } else if (progressionPoint <= 0.6) {
            skillLevel = "intermediate";
            requirement = "required";
          } else {
            skillLevel = "advanced";
            requirement = "required";
          }
          break;

        default: // Common skills and others
          if (progressionPoint <= 0.3) {
            skillLevel = "beginner";
            requirement = "preferred";
          } else if (progressionPoint <= 0.6) {
            skillLevel = "intermediate";
            requirement = "required";
          } else {
            skillLevel = "advanced";
            requirement = "required";
          }
      }
    } else {
      // Professional track progression (keeping existing logic)
      switch (importance) {
        case 4: // Core skills
          if (progressionPoint <= 0.2) {
            skillLevel = "intermediate";
            requirement = "required";
          } else {
            skillLevel = "advanced";
            requirement = "required";
          }
          break;

        case 3: // Role-critical skills
          if (progressionPoint <= 0.3) {
            skillLevel = "intermediate";
            requirement = "required";
          } else if (progressionPoint <= 0.6) {
            skillLevel = "intermediate";
            requirement = "required";
          } else {
            skillLevel = "advanced";
            requirement = "required";
          }
          break;

        case 2: // Specialized skills
          if (progressionPoint <= 0.3) {
            skillLevel = "beginner";
            requirement = "preferred";
          } else if (progressionPoint <= 0.6) {
            skillLevel = "intermediate";
            requirement = "required";
          } else {
            skillLevel = "advanced";
            requirement = "required";
          }
          break;

        default: // Common skills and others
          if (progressionPoint <= 0.3) {
            skillLevel = "beginner";
            requirement = "preferred";
          } else if (progressionPoint <= 0.6) {
            skillLevel = "intermediate";
            requirement = "preferred";
          } else {
            skillLevel = "advanced";
            requirement = "required";
          }
      }
    }

    console.log(`Generated level for ${skillName} at ${level}: ${skillLevel} (${requirement})`);
    
    progression[level.toLowerCase()] = {
      level: skillLevel,
      required: requirement
    };
  });

  return progression;
};
