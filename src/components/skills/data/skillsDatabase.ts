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
      P2: { level: 'beginner', requirement: 'preferred' },
      P3: { level: 'intermediate', requirement: 'preferred' },
      P4: { level: 'beginner', requirement: 'preferred' },
      P5: { level: 'advanced', requirement: 'preferred' },
      P6: { level: 'advanced', requirement: 'required' }
    }
  },
  {
    title: "Natural Language Processing",
    category: "specialized",
    subcategory: "AI Applications",
    professionalTrack: {
      P1: { level: 'unspecified', requirement: 'preferred' },
      P2: { level: 'beginner', requirement: 'preferred' },
      P3: { level: 'intermediate', requirement: 'preferred' },
      P4: { level: 'advanced', requirement: 'required' },
      P5: { level: 'advanced', requirement: 'required' },
      P6: { level: 'advanced', requirement: 'required' }
    }
  },
  {
    title: "Computer Vision",
    category: "specialized",
    subcategory: "AI Applications",
    professionalTrack: {
      P1: { level: 'unspecified', requirement: 'preferred' },
      P2: { level: 'beginner', requirement: 'preferred' },
      P3: { level: 'intermediate', requirement: 'required' },
      P4: { level: 'advanced', requirement: 'required' },
      P5: { level: 'advanced', requirement: 'required' },
      P6: { level: 'advanced', requirement: 'required' }
    }
  },
  {
    title: "TensorFlow",
    category: "specialized",
    subcategory: "Machine Learning Frameworks",
    professionalTrack: {
      P1: { level: 'unspecified', requirement: 'preferred' },
      P2: { level: 'beginner', requirement: 'preferred' },
      P3: { level: 'intermediate', requirement: 'preferred' },
      P4: { level: 'intermediate', requirement: 'preferred' },
      P5: { level: 'advanced', requirement: 'required' },
      P6: { level: 'advanced', requirement: 'required' }
    }
  },
  {
    title: "PyTorch",
    category: "specialized",
    subcategory: "Machine Learning Frameworks",
    professionalTrack: {
      P1: { level: 'unspecified', requirement: 'preferred' },
      P2: { level: 'beginner', requirement: 'preferred' },
      P3: { level: 'intermediate', requirement: 'preferred' },
      P4: { level: 'intermediate', requirement: 'preferred' },
      P5: { level: 'advanced', requirement: 'required' },
      P6: { level: 'advanced', requirement: 'required' }
    }
  },
  {
    title: "Python",
    category: "common",
    subcategory: "Programming Languages",
    professionalTrack: {
      P1: { level: 'intermediate', requirement: 'required' },
      P2: { level: 'advanced', requirement: 'required' },
      P3: { level: 'advanced', requirement: 'required' },
      P4: { level: 'advanced', requirement: 'required' },
      P5: { level: 'advanced', requirement: 'required' },
      P6: { level: 'advanced', requirement: 'required' }
    }
  },
  {
    title: "Problem Solving",
    category: "common",
    subcategory: "Soft Skills",
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
    title: "Technical Writing",
    category: "common",
    subcategory: "Communication",
    professionalTrack: {
      P1: { level: 'beginner', requirement: 'preferred' },
      P2: { level: 'intermediate', requirement: 'preferred' },
      P3: { level: 'intermediate', requirement: 'preferred' },
      P4: { level: 'intermediate', requirement: 'preferred' },
      P5: { level: 'advanced', requirement: 'required' },
      P6: { level: 'advanced', requirement: 'required' }
    }
  },
  {
    title: "AWS Certified Machine Learning - Specialty",
    category: "certification",
    subcategory: "Cloud Certification",
    professionalTrack: {
      P1: { level: 'unspecified', requirement: 'preferred' },
      P2: { level: 'beginner', requirement: 'preferred' },
      P3: { level: 'intermediate', requirement: 'preferred' },
      P4: { level: 'intermediate', requirement: 'preferred' },
      P5: { level: 'advanced', requirement: 'required' },
      P6: { level: 'advanced', requirement: 'required' }
    }
  },
  {
    title: "TensorFlow Developer Certificate",
    category: "certification",
    subcategory: "AI Certification",
    professionalTrack: {
      P1: { level: 'unspecified', requirement: 'preferred' },
      P2: { level: 'beginner', requirement: 'preferred' },
      P3: { level: 'intermediate', requirement: 'preferred' },
      P4: { level: 'intermediate', requirement: 'preferred' },
      P5: { level: 'advanced', requirement: 'required' },
      P6: { level: 'advanced', requirement: 'required' }
    }
  },
  {
    title: "Google Cloud Professional Machine Learning Engineer",
    category: "certification",
    subcategory: "Cloud Certification",
    professionalTrack: {
      P1: { level: 'unspecified', requirement: 'preferred' },
      P2: { level: 'beginner', requirement: 'preferred' },
      P3: { level: 'intermediate', requirement: 'preferred' },
      P4: { level: 'intermediate', requirement: 'preferred' },
      P5: { level: 'advanced', requirement: 'required' },
      P6: { level: 'advanced', requirement: 'required' }
    }
  }
];

// Helper functions remain unchanged
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
