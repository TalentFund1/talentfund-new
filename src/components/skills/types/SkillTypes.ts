export interface Skill {
  title: string;
  subcategory: string;
  level: string;
  growth: string;
}

export interface SkillsTableProps {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}

export interface SkillLevel {
  level: 'unspecified' | 'beginner' | 'intermediate' | 'advanced';
  requirement: 'required' | 'preferred';
}

export interface SkillTrackLevels {
  [key: string]: SkillLevel;  // P1-P6 or M3-M6
}

export interface SkillEntry {
  title: string;
  category: 'critical' | 'technical' | 'necessary';
  subcategory: string;
  type: 'specialized' | 'common' | 'certification';
  growth?: string;
  tracks?: {
    professional?: SkillTrackLevels;
    managerial?: SkillTrackLevels;
  };
}