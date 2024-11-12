export interface SkillLevel {
  level: 'unspecified' | 'beginner' | 'intermediate' | 'advanced';
  requirement: 'required' | 'preferred';
}

export interface SkillTrackLevels {
  [key: string]: SkillLevel;  // P1-P6 or M3-M6
}

export interface SkillData {
  title: string;
  category: 'specialized' | 'common' | 'certification';
  subcategory: string;
  professionalTrack?: SkillTrackLevels;
  managerialTrack?: SkillTrackLevels;
}

export const skillsDatabase: SkillData[] = [
  {
    title: "Python",
    category: "specialized",
    subcategory: "Programming Languages",
    professionalTrack: {
      P1: { level: 'intermediate', requirement: 'required' },
      P2: { level: 'intermediate', requirement: 'required' },
      P3: { level: 'advanced', requirement: 'required' },
      P4: { level: 'advanced', requirement: 'required' },
      P5: { level: 'advanced', requirement: 'required' },
      P6: { level: 'advanced', requirement: 'required' }
    }
  },
  {
    title: "Machine Learning",
    category: "specialized",
    subcategory: "AI & ML",
    professionalTrack: {
      P1: { level: 'beginner', requirement: 'preferred' },
      P2: { level: 'intermediate', requirement: 'required' },
      P3: { level: 'advanced', requirement: 'required' },
      P4: { level: 'advanced', requirement: 'required' },
      P5: { level: 'advanced', requirement: 'required' },
      P6: { level: 'advanced', requirement: 'required' }
    }
  },
  {
    title: "Deep Learning",
    category: "specialized",
    subcategory: "AI & ML",
    professionalTrack: {
      P1: { level: 'unspecified', requirement: 'preferred' },
      P2: { level: 'unspecified', requirement: 'preferred' },
      P3: { level: 'unspecified', requirement: 'preferred' },
      P4: { level: 'beginner', requirement: 'preferred' },
      P5: { level: 'unspecified', requirement: 'preferred' },
      P6: { level: 'unspecified', requirement: 'preferred' }
    }
  },
  {
    title: "Team Leadership",
    category: "common",
    subcategory: "Leadership",
    managerialTrack: {
      M3: { level: 'intermediate', requirement: 'required' },
      M4: { level: 'advanced', requirement: 'required' },
      M5: { level: 'advanced', requirement: 'required' },
      M6: { level: 'advanced', requirement: 'required' }
    }
  },
  {
    title: "AWS Certified Solutions Architect",
    category: "certification",
    subcategory: "Cloud Certification",
    professionalTrack: {
      P1: { level: 'unspecified', requirement: 'preferred' },
      P2: { level: 'unspecified', requirement: 'preferred' },
      P3: { level: 'advanced', requirement: 'required' },
      P4: { level: 'advanced', requirement: 'required' },
      P5: { level: 'advanced', requirement: 'required' },
      P6: { level: 'advanced', requirement: 'required' }
    }
  }
];

// Helper function to get skills by track and level
export const getSkillsByTrackAndLevel = (
  track: 'professional' | 'managerial',
  level: string
): SkillData[] => {
  return skillsDatabase.filter(skill => {
    const trackData = track === 'professional' ? skill.professionalTrack : skill.managerialTrack;
    return trackData && trackData[level];
  });
};

// Helper function to get skills by category
export const getSkillsByCategory = (
  category: 'specialized' | 'common' | 'certification'
): SkillData[] => {
  return skillsDatabase.filter(skill => skill.category === category);
};

// Helper function to get skill requirements for specific track and level
export const getSkillRequirements = (
  skillTitle: string,
  track: 'professional' | 'managerial',
  level: string
): SkillLevel | undefined => {
  const skill = skillsDatabase.find(s => s.title === skillTitle);
  if (!skill) return undefined;
  
  const trackData = track === 'professional' ? skill.professionalTrack : skill.managerialTrack;
  return trackData?.[level];
};