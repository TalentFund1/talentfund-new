import { Skill, Certification } from './types';

export const technicalLevels = ["P1", "P2", "P3", "P4", "P5", "P6"] as const;
export const managerialLevels = ["M3", "M4", "M5", "M6"] as const;

export const requiredSkills: Skill[] = [
  { name: "React", level: "advanced" },
  { name: "JavaScript", level: "advanced" },
  { name: "GraphQL", level: "intermediate" },
  { name: "HTML and CSS3", level: "advanced" },
  { name: "IPA Integrations", level: "intermediate" }
].sort((a, b) => {
  const levelOrder = {
    advanced: 0,
    intermediate: 1,
    beginner: 2,
    unspecified: 3
  };
  return levelOrder[a.level] - levelOrder[b.level];
});

export const preferredSkills: Skill[] = [
  { name: "UI/UX Design Principles", level: "intermediate" },
  { name: "Communication", level: "intermediate" },
  { name: "Angular", level: "beginner" }
].sort((a, b) => {
  const levelOrder = {
    advanced: 0,
    intermediate: 1,
    beginner: 2,
    unspecified: 3
  };
  return levelOrder[a.level] - levelOrder[b.level];
});

export const certifications: Certification[] = [
  { name: "Cybersecurity License" }
];