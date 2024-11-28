export type Track = "Professional" | "Managerial";

export const getSkillImportance = (
  skillName: string, 
  category: string, 
  track: Track,
  roleId: string
): number => {
  // Market trend-based core skills
  const coreSkills = {
    professional: [
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Problem Solving",
      "Technical Writing"
    ],
    managerial: [
      "Team Leadership",
      "Project Management",
      "Strategic Planning",
      "Stakeholder Management",
      "System Design",
      "Technical Architecture"
    ]
  };

  // Role-specific critical skills based on market demand
  const criticalSkillsByRole: Record<string, string[]> = {
    "123": [ // AI Engineer
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Computer Vision",
      "TensorFlow"
    ],
    "124": [ // Backend Engineer
      "Node.js",
      "Database Design",
      "API Development",
      "System Architecture",
      "Kubernetes"
    ],
    "125": [ // Frontend Engineer
      "React",
      "TypeScript",
      "Next.js",
      "Performance Optimization",
      "CSS/SASS"
    ],
    "126": [ // Engineering Manager
      "System Design",
      "Technical Architecture",
      "Risk Management",
      "Team Leadership",
      "Strategic Planning"
    ]
  };

  console.log(`Calculating importance for ${skillName} in ${track} track`);

  // Check if it's a core skill for the current track
  if (coreSkills[track.toLowerCase()].includes(skillName)) {
    console.log(`${skillName} identified as core ${track} skill (importance: 4)`);
    return 4;
  }

  // Check if it's a role-critical skill based on market trends
  if (criticalSkillsByRole[roleId]?.includes(skillName)) {
    console.log(`${skillName} identified as role-critical skill for role ${roleId} (importance: 3)`);
    return 3;
  }

  // Category-based importance with market consideration
  switch (category.toLowerCase()) {
    case 'specialized':
      console.log(`${skillName} is a specialized skill (importance: 2)`);
      return 2;
    case 'certification':
      console.log(`${skillName} is a certification (importance: 1)`);
      return 1;
    default:
      console.log(`${skillName} is a common skill (importance: 0)`);
      return 0;
  }
};