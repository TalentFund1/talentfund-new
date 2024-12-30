export type SkillId = string;

export type SkillCategory = 'specialized' | 'common' | 'certification';

export type SkillWeight = 'technical' | 'soft' | 'business' | 'leadership';

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
  specialized: RoleSkillRequirement[];
  common: RoleSkillRequirement[];
  certifications: RoleSkillRequirement[];
}