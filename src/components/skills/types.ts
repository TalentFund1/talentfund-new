export interface BaseSkill {
  name: string;
}

export interface DetailedSkill extends BaseSkill {
  level: string;
  isSkillGoal: boolean;
}

export interface Certification extends BaseSkill {
  name: string;
}

export interface SkillProfileItem {
  title: string;
  subcategory: string;
  level: string;
  growth: string;
  salary: string;
  benchmarks: {
    J: boolean;
    B: boolean;
    O: boolean;
  };
  isSelected?: boolean;
}

export interface SkillProfileState {
  selectedSkills: string[];
  originalSelectedSkills: string[];
}