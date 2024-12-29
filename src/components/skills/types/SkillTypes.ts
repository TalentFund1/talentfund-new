import { 
  SkillLevel, 
  SkillGoalStatus,
  SkillRequirementLevel,
  SkillMetrics,
  SkillWeight,
  SkillCategory
} from './sharedSkillTypes';

export interface DetailedSkill {
  name: string;
  level: string;
  isSkillGoal: boolean;
}

export interface Skill {
  id: string;
  title: string;
  subcategory: string;
  category: SkillCategory;
  businessCategory: string;
  weight: SkillWeight;
  level: SkillLevel;
  growth: string;
  salary: string;
  skillScore: number;
  minimumLevel: SkillLevel;
  requirementLevel: SkillRequirementLevel;
  metrics: SkillMetrics;
  benchmarks: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
}

export interface UnifiedSkill extends Skill {
  goalStatus?: SkillGoalStatus;
  roleLevel?: string;
  isCompanySkill?: boolean;
}

export interface RoleSkillData {
  roleId: string;
  title: string;
  soc?: string;
  function?: string;
  mappedTitle?: string;
  occupation?: string;
  description?: string;
  roleTrack?: "Professional" | "Managerial";
  track: "Professional" | "Managerial";
  specialized: UnifiedSkill[];
  common: UnifiedSkill[];
  certifications: UnifiedSkill[];
  skills: UnifiedSkill[];
}

export interface SimpleSkill {
  title: string;
  subcategory: string;
  businessCategory?: string;
  level: string;
  growth: string;
}