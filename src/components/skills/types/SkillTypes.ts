import { SkillLevel, SkillWeight, SkillCategory, SkillMetrics, SkillRequirementLevel } from './sharedSkillTypes';

export type SkillId = string;

export interface UnifiedSkill {
  id: SkillId;
  title: string;
  subcategory: string;
  category: SkillCategory;
  businessCategory: string;
  weight: SkillWeight;
  level: string;
  growth: string;
  salary: string;
  hasSkill?: boolean;
  skillScore?: number;
  minimumLevel?: SkillLevel;
  requirementLevel?: SkillRequirementLevel;
  metrics?: SkillMetrics;
  benchmarks?: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
}

export interface RoleSkillRequirement extends UnifiedSkill {
  minimumLevel: string;
  requirementLevel: string;
  metrics: {
    growth: string;
    salary: string;
    skillScore: number;
  };
  skillScore: number;
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