import { 
  SkillLevel, 
  SkillCategory, 
  SkillWeight, 
  SkillMetrics, 
  Track,
  SkillRequirementLevel 
} from './sharedSkillTypes';

export interface RoleSkillRequirement {
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
  benchmarks?: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
}

export interface RoleSkillData {
  roleId: string;
  title: string;
  soc?: string;
  function?: string;
  mappedTitle?: string;
  occupation?: string;
  description?: string;
  roleTrack?: Track;
  track: Track;
  specialized: RoleSkillRequirement[];
  common: RoleSkillRequirement[];
  certifications: RoleSkillRequirement[];
  skills: RoleSkillRequirement[];
}