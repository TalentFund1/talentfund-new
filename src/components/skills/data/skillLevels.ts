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