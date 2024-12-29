import { SkillLevel, SkillCategory, SkillConfidence } from './SkillTypes';

export type SkillRequirementLevel = 'required' | 'preferred' | 'optional';

export interface RoleSkillRequirement {
  id: string;
  title: string;
  subcategory: string;
  category: SkillCategory;
  businessCategory: string;
  weight: string;
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