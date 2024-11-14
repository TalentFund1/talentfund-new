import { SkillData, SkillLevel, SkillTrackLevels } from './skillLevels';
import { aiSkills } from './skills/aiSkills';
import { backendSkills } from './skills/backendSkills';
import { commonSkills } from './skills/commonSkills';
import { certificationSkills } from './skills/certificationSkills';

export type { SkillData, SkillLevel };

export const skillsDatabase: SkillData[] = [
  ...aiSkills,
  ...backendSkills,
  ...commonSkills,
  ...certificationSkills
];

export const getSkillRequirements = (
  skillTitle: string,
  track: 'professional' | 'managerial',
  level: string
): { level: string; requirement: string } | undefined => {
  if (track === 'professional') {
    const requirements = {
      P1: {
        "Computer Vision": { level: "unspecified", requirement: "preferred" },
        "Deep Learning": { level: "beginner", requirement: "required" },
        "Machine Learning": { level: "unspecified", requirement: "preferred" },
        "Natural Language Processing": { level: "unspecified", requirement: "preferred" },
        "PyTorch": { level: "unspecified", requirement: "preferred" },
        "Python": { level: "unspecified", requirement: "preferred" },
        "TensorFlow": { level: "unspecified", requirement: "preferred" }
      },
      P2: {
        "Computer Vision": { level: "unspecified", requirement: "preferred" },
        "Deep Learning": { level: "intermediate", requirement: "required" },
        "Machine Learning": { level: "unspecified", requirement: "preferred" },
        "Natural Language Processing": { level: "unspecified", requirement: "preferred" },
        "PyTorch": { level: "unspecified", requirement: "preferred" },
        "Python": { level: "unspecified", requirement: "preferred" },
        "TensorFlow": { level: "unspecified", requirement: "preferred" }
      },
      P3: {
        "Computer Vision": { level: "intermediate", requirement: "required" },
        "Deep Learning": { level: "advanced", requirement: "required" },
        "Machine Learning": { level: "intermediate", requirement: "required" },
        "Natural Language Processing": { level: "beginner", requirement: "preferred" },
        "PyTorch": { level: "unspecified", requirement: "preferred" },
        "Python": { level: "unspecified", requirement: "preferred" },
        "TensorFlow": { level: "unspecified", requirement: "preferred" }
      },
      P4: {
        // Backend Engineer P4
        "Node.js": { level: "advanced", requirement: "preferred" },
        "Database Design": { level: "advanced", requirement: "preferred" },
        "API Development": { level: "advanced", requirement: "required" },
        "System Architecture": { level: "advanced", requirement: "preferred" },
        "Kubernetes": { level: "advanced", requirement: "preferred" },
        "Problem Solving": { level: "advanced", requirement: "preferred" },
        "Code Review": { level: "advanced", requirement: "preferred" },
        "Agile Methodologies": { level: "advanced", requirement: "preferred" },
        "AWS Certified Solutions Architect": { level: "advanced", requirement: "required" },
        "Kubernetes Administrator (CKA)": { level: "advanced", requirement: "preferred" },
        // AI Engineer P4
        "Machine Learning": { level: "advanced", requirement: "required" },
        "Deep Learning": { level: "advanced", requirement: "required" },
        "TensorFlow": { level: "advanced", requirement: "preferred" },
        "PyTorch": { level: "advanced", requirement: "preferred" },
        "Computer Vision": { level: "advanced", requirement: "required" },
        "Natural Language Processing": { level: "advanced", requirement: "required" },
        "Python": { level: "advanced", requirement: "required" },
        // Frontend Engineer P4
        "React": { level: "advanced", requirement: "required" },
        "TypeScript": { level: "advanced", requirement: "required" },
        "UI/UX Design": { level: "intermediate", requirement: "preferred" },
        "CSS/SASS": { level: "advanced", requirement: "required" },
        "Next.js": { level: "advanced", requirement: "preferred" },
        "Cross-browser Compatibility": { level: "advanced", requirement: "required" },
        "Responsive Design": { level: "advanced", requirement: "preferred" }
      },
      // Add other professional levels (P5-P6) following the same pattern
    };

    return requirements[level]?.[skillTitle];
  }

  // For managerial track (M3-M6)
  if (track === 'managerial') {
    const managerialRequirements = {
      M3: {
        "System Design": { level: "advanced", requirement: "required" },
        "Technical Architecture": { level: "advanced", requirement: "required" },
        "Risk Management": { level: "advanced", requirement: "required" },
        "Team Leadership": { level: "advanced", requirement: "required" },
        "Project Management": { level: "advanced", requirement: "required" },
        "Strategic Planning": { level: "advanced", requirement: "required" },
        "Stakeholder Management": { level: "advanced", requirement: "required" }
      },
      // Add other managerial levels (M4-M6) following the same pattern
    };

    return managerialRequirements[level]?.[skillTitle];
  }

  return undefined;
};

export const getSkillsByTrackAndLevel = (
  track: 'professional' | 'managerial',
  level: string
): SkillData[] => {
  return skillsDatabase.filter(skill => {
    const trackData = track === 'professional' ? skill.professionalTrack : skill.managerialTrack;
    return trackData && trackData[level];
  });
};

export const getSkillsByCategory = (
  category: 'specialized' | 'common' | 'certification'
): SkillData[] => {
  return skillsDatabase.filter(skill => skill.category === category);
};
