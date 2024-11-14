import { SkillData, SkillLevel, SkillTrackLevels } from './skillLevels';
import { aiSkills } from './skills/aiSkills';
import { backendSkills } from './skills/backendSkills';
import { commonSkills } from './skills/commonSkills';
import { certificationSkills } from './skills/certificationSkills';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type { SkillData, SkillLevel };

export const skillsDatabase: SkillData[] = [
  ...aiSkills,
  ...backendSkills,
  ...commonSkills,
  ...certificationSkills
];

interface SkillRequirement {
  level: string;
  requirement: string;
}

interface SkillRequirements {
  [key: string]: {
    [level: string]: {
      [skillTitle: string]: SkillRequirement;
    };
  };
}

interface SkillRequirementsStore {
  requirements: SkillRequirements;
  updateSkillRequirement: (
    track: string,
    level: string,
    skillTitle: string,
    requirement: SkillRequirement
  ) => void;
}

export const useSkillRequirements = create<SkillRequirementsStore>()(
  persist(
    (set) => ({
      requirements: {
        professional: {
          P1: {},
          P2: {},
          P3: {},
          P4: {},
          P5: {},
          P6: {},
        },
        managerial: {
          M3: {},
          M4: {},
          M5: {},
          M6: {},
        },
      },
      updateSkillRequirement: (track, level, skillTitle, requirement) =>
        set((state) => ({
          requirements: {
            ...state.requirements,
            [track]: {
              ...state.requirements[track],
              [level]: {
                ...state.requirements[track]?.[level],
                [skillTitle]: requirement,
              },
            },
          },
        })),
    }),
    {
      name: 'skill-requirements-storage',
    }
  )
);

export const getSkillRequirements = (
  skillTitle: string,
  track: 'professional' | 'managerial',
  level: string
): { level: string; requirement: string } | undefined => {
  const { requirements } = useSkillRequirements.getState();
  return requirements[track]?.[level]?.[skillTitle] || {
    level: 'unspecified',
    requirement: 'preferred',
  };
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