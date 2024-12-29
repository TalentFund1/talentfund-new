import { SkillCategory, SkillWeight } from './SkillTypes';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'unspecified';
export type SkillRequirementLevel = 'required' | 'preferred' | 'optional';
export type SkillConfidence = 'low' | 'medium' | 'high';

export interface RoleSkillRequirement {
  id: string;
  title: string;
  subcategory: string;
  category: SkillCategory;
  businessCategory: string;
  weight: SkillWeight;
  minimumLevel: SkillLevel;
  requirementLevel: SkillRequirementLevel;
  growth: string;
  salary: string;
  level: SkillLevel;
  confidence: SkillConfidence;
  skillScore: number;
  benchmarks: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
  metrics: {
    growth: string;
    salary: string;
    confidence: SkillConfidence;
    skillScore: number;
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
  roleTrack?: "Professional" | "Managerial";
  track: "Professional" | "Managerial";
  specialized: RoleSkillRequirement[];
  common: RoleSkillRequirement[];
  certifications: RoleSkillRequirement[];
  skills: RoleSkillRequirement[];
}