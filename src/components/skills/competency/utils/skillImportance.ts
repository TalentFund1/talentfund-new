export type Track = "Professional" | "Managerial";

export const getSkillImportance = (
  skillName: string, 
  category: string, 
  track: Track,
  roleId: string
): number => {
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

  console.log(`Calculating importance for ${skillName} in ${track} track`);

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