import { 
  SkillLevel, 
  SkillGoalStatus, 
  SkillRequirementLevel, 
  SkillCategory, 
  SkillWeight, 
  SkillMetrics, 
  SkillBenchmark 
} from './sharedSkillTypes';

export type { SkillCategory, SkillWeight };

export interface RoleSkillRequirement {
  id: string;
  title: string;
  subcategory: string;
  category: SkillCategory;
  businessCategory: string;
  weight: SkillWeight;
  minimumLevel: SkillLevel;
  requirementLevel: SkillRequirementLevel;
  level: SkillLevel;
  growth: string;
  salary: string;
  skillScore: number;
  required: boolean;
  benchmarks: SkillBenchmark;
  metrics: SkillMetrics;
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
  specialized: RoleSkillRequirement[];
  common: RoleSkillRequirement[];
  certifications: RoleSkillRequirement[];
  skills: RoleSkillRequirement[];
}