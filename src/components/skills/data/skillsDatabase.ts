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
      P4: {
        "Machine Learning": { level: "intermediate", requirement: "required" },
        "Deep Learning": { level: "advanced", requirement: "required" },
        "TensorFlow": { level: "unspecified", requirement: "preferred" },
        "PyTorch": { level: "beginner", requirement: "required" },
        "Computer Vision": { level: "advanced", requirement: "required" },
        "Natural Language Processing": { level: "intermediate", requirement: "required" },
        "Python": { level: "beginner", requirement: "preferred" },
        "Problem Solving": { level: "advanced", requirement: "required" },
        "Technical Writing": { level: "intermediate", requirement: "preferred" },
        "AWS Certified Machine Learning - Specialty": { level: "beginner", requirement: "preferred" },
        "TensorFlow Developer Certificate": { level: "unspecified", requirement: "preferred" },
        "Google Cloud Professional Machine Learning Engineer": { level: "beginner", requirement: "preferred" }
      },
      P1: {
        "Machine Learning": { level: "beginner", requirement: "required" },
        "Deep Learning": { level: "unspecified", requirement: "preferred" },
        "TensorFlow": { level: "unspecified", requirement: "preferred" },
        "PyTorch": { level: "unspecified", requirement: "preferred" },
        "Computer Vision": { level: "unspecified", requirement: "preferred" },
        "Natural Language Processing": { level: "unspecified", requirement: "preferred" },
        "Python": { level: "beginner", requirement: "required" }
      },
      P2: {
        "Machine Learning": { level: "intermediate", requirement: "required" },
        "Deep Learning": { level: "beginner", requirement: "required" },
        "TensorFlow": { level: "beginner", requirement: "preferred" },
        "PyTorch": { level: "unspecified", requirement: "preferred" },
        "Computer Vision": { level: "beginner", requirement: "preferred" },
        "Natural Language Processing": { level: "beginner", requirement: "preferred" },
        "Python": { level: "intermediate", requirement: "required" }
      },
      P3: {
        "Machine Learning": { level: "intermediate", requirement: "required" },
        "Deep Learning": { level: "intermediate", requirement: "required" },
        "TensorFlow": { level: "intermediate", requirement: "required" },
        "PyTorch": { level: "beginner", requirement: "preferred" },
        "Computer Vision": { level: "intermediate", requirement: "required" },
        "Natural Language Processing": { level: "intermediate", requirement: "required" },
        "Python": { level: "intermediate", requirement: "required" }
      }
    };

    return requirements[level]?.[skillTitle];
  }

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
      }
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