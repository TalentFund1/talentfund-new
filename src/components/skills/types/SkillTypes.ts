export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillType = SkillCategory;
export type SkillRequirement = 'required' | 'preferred' | 'skill_goal' | 'not_interested' | 'unknown';

export interface SkillState {
  level: string;
  required: string;
  requirement: string;
}

export interface DetailedSkill {
  name: string;
  level: string;
  isSkillGoal: boolean;
}

export interface UnifiedSkill {
  id: string;
  title: string;
  subcategory: string;
  category: SkillCategory;
  businessCategory: string;
  weight: SkillWeight;
  level: string;
  growth: string;
  salary: string;
  confidence: 'low' | 'medium' | 'high';
  benchmarks: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
  requirement?: SkillRequirement;
  roleLevel?: string;
  isCompanySkill?: boolean;
}

export interface RoleSkillData {
  title: string;
  soc?: string;
  function?: string;
  mappedTitle?: string;
  occupation?: string;
  description?: string;
  roleTrack?: "Professional" | "Managerial";
  specialized: UnifiedSkill[];
  common: UnifiedSkill[];
  certifications: UnifiedSkill[];
  skills: UnifiedSkill[];
}