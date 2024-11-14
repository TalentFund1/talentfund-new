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
  // For AI Engineer P4 level
  if (track === 'professional') {
    const p4Requirements: { [key: string]: { level: string; requirement: string } } = {
      "Computer Vision": { level: "advanced", requirement: "required" },
      "Deep Learning": { level: "advanced", requirement: "required" },
      "Machine Learning": { level: "intermediate", requirement: "required" },
      "Natural Language Processing": { level: "intermediate", requirement: "required" },
      "PyTorch": { level: "beginner", requirement: "required" },
      "Python": { level: "unspecified", requirement: "required" },
      "TensorFlow": { level: "unspecified", requirement: "preferred" }
    };

    // Add requirements for other levels (P1-P3, P5-P6)
    const requirements = {
      P1: {
        // Define P1 requirements
      },
      P2: {
        // Define P2 requirements
      },
      P3: {
        // Define P3 requirements
      },
      P4: p4Requirements,
      P5: {
        // Define P5 requirements
      },
      P6: {
        // Define P6 requirements
      }
    };

    return requirements[level]?.[skillTitle];
  }

  // For managerial track
  if (track === 'managerial') {
    const managerialRequirements: { [key: string]: { [key: string]: { level: string; requirement: string } } } = {
      M3: {
        // Define M3 requirements
      },
      M4: {
        // Define M4 requirements
      },
      M5: {
        // Define M5 requirements
      },
      M6: {
        // Define M6 requirements
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
