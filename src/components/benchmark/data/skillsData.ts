export const requiredSkills = [
  { name: "React", level: "advanced" as const },
  { name: "JavaScript", level: "advanced" as const },
  { name: "GraphQL", level: "intermediate" as const },
  { name: "HTML and CSS3", level: "advanced" as const },
  { name: "IPA Integrations", level: "intermediate" as const }
].sort((a, b) => {
  const levelOrder = {
    advanced: 0,
    intermediate: 1,
    beginner: 2,
    unspecified: 3
  };
  return levelOrder[a.level] - levelOrder[b.level];
});

export const preferredSkills = [
  { name: "UI/UX Design Principles", level: "intermediate" as const },
  { name: "Communication", level: "intermediate" as const },
  { name: "Angular", level: "beginner" as const }
].sort((a, b) => {
  const levelOrder = {
    advanced: 0,
    intermediate: 1,
    beginner: 2,
    unspecified: 3
  };
  return levelOrder[a.level] - levelOrder[b.level];
});

export const certifications = [
  { name: "Cybersecurity License" }
];