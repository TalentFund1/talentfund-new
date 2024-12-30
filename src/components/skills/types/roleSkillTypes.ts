import { SkillLevel, SkillCategory, SkillWeight, SkillMetrics, Track } from './sharedSkillTypes';

export type SkillRequirementLevel = 'required' | 'preferred' | 'optional';

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
  benchmarks: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
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
  roleTrack?: Track;
  track: Track;
  specialized: RoleSkillRequirement[];
  common: RoleSkillRequirement[];
  certifications: RoleSkillRequirement[];
  skills: RoleSkillRequirement[];
}