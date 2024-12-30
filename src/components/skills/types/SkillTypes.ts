import { 
  SkillLevel, 
  SkillWeight, 
  SkillCategory, 
  SkillMetrics, 
  SkillRequirementLevel,
  BaseSkill 
} from './sharedSkillTypes';

export type SkillId = string;

export interface UnifiedSkill extends BaseSkill {
  growth: string;
  hasSkill?: boolean;
  benchmarks?: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
}

export interface RoleSkillRequirement extends UnifiedSkill {
  minimumLevel: SkillLevel;
  requirementLevel: SkillRequirementLevel;
  metrics: SkillMetrics;
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

export type { 
  SkillLevel,
  SkillWeight,
  SkillCategory,
  SkillMetrics,
  SkillRequirementLevel
};