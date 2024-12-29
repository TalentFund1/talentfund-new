import { SkillCategory, SkillWeight } from './SkillTypes';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'unspecified';
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
  level: string;
  growth: string;
  salary: string;
  confidence: 'low' | 'medium' | 'high';
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
    confidence: 'low' | 'medium' | 'high';
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