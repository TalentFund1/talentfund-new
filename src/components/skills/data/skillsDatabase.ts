import { SkillData, SkillLevel } from './skillTypes';
import { aiSkills } from './skills/aiSkills';
import { commonSkills } from './skills/commonSkills';
import { certificationSkills } from './skills/certificationSkills';

export type { SkillData, SkillLevel };

export const skillsDatabase: SkillData[] = [
  ...aiSkills,
  ...commonSkills,
  ...certificationSkills
];

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

export const getSkillRequirements = (
  skillTitle: string,
  track: 'professional' | 'managerial',
  level: string
): SkillLevel | undefined => {
  const skill = skillsDatabase.find(s => s.title === skillTitle);
  if (!skill) return undefined;
  
  const trackData = track === 'professional' ? skill.professionalTrack : skill.managerialTrack;
  return trackData?.[level.toUpperCase()];
};