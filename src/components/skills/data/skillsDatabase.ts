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
        "Deep Learning": { level: "unspecified", requirement: "preferred" },
        "Machine Learning": { level: "unspecified", requirement: "preferred" },
        "Computer Vision": { level: "unspecified", requirement: "preferred" },
        "Natural Language Processing": { level: "unspecified", requirement: "preferred" },
        "PyTorch": { level: "unspecified", requirement: "preferred" },
        "Python": { level: "unspecified", requirement: "preferred" },
        "TensorFlow": { level: "unspecified", requirement: "preferred" }
      },
      P2: {
        "Deep Learning": { level: "intermediate", requirement: "required" },
        "Machine Learning": { level: "unspecified", requirement: "preferred" },
        "Computer Vision": { level: "unspecified", requirement: "preferred" },
        "Natural Language Processing": { level: "unspecified", requirement: "preferred" },
        "PyTorch": { level: "unspecified", requirement: "preferred" },
        "Python": { level: "unspecified", requirement: "preferred" },
        "TensorFlow": { level: "unspecified", requirement: "preferred" }
      },
      P3: {
        "Deep Learning": { level: "advanced", requirement: "required" },
        "Machine Learning": { level: "intermediate", requirement: "required" },
        "Computer Vision": { level: "intermediate", requirement: "required" },
        "Natural Language Processing": { level: "beginner", requirement: "preferred" },
        "PyTorch": { level: "unspecified", requirement: "preferred" },
        "Python": { level: "unspecified", requirement: "preferred" },
        "TensorFlow": { level: "unspecified", requirement: "preferred" }
      },
      P4: {
        "Computer Vision": { level: "advanced", requirement: "required" },
        "Deep Learning": { level: "advanced", requirement: "required" },
        "Machine Learning": { level: "intermediate", requirement: "required" },
        "Natural Language Processing": { level: "intermediate", requirement: "required" },
        "PyTorch": { level: "beginner", requirement: "required" },
        "Python": { level: "unspecified", requirement: "required" },
        "TensorFlow": { level: "unspecified", requirement: "preferred" }
      },
      P5: {
        "Computer Vision": { level: "advanced", requirement: "required" },
        "Deep Learning": { level: "advanced", requirement: "required" },
        "Machine Learning": { level: "advanced", requirement: "required" },
        "Natural Language Processing": { level: "intermediate", requirement: "required" },
        "PyTorch": { level: "beginner", requirement: "required" },
        "Python": { level: "beginner", requirement: "required" },
        "TensorFlow": { level: "unspecified", requirement: "preferred" }
      },
      P6: {
        "Computer Vision": { level: "advanced", requirement: "required" },
        "Deep Learning": { level: "advanced", requirement: "required" },
        "Machine Learning": { level: "advanced", requirement: "required" },
        "Natural Language Processing": { level: "intermediate", requirement: "required" },
        "PyTorch": { level: "advanced", requirement: "required" },
        "Python": { level: "advanced", requirement: "required" },
        "TensorFlow": { level: "unspecified", requirement: "preferred" }
      }
    };

    return requirements[level]?.[skillTitle];
  }

  // For managerial track
  if (track === 'managerial') {
    const managerialRequirements: { [key: string]: { [key: string]: { level: string; requirement: string } } } = {
      M3: {
        // Define M3 requirements based on the matrix
      },
      M4: {
        // Define M4 requirements based on the matrix
      },
      M5: {
        // Define M5 requirements based on the matrix
      },
      M6: {
        // Define M6 requirements based on the matrix
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