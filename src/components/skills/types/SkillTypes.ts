export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'unspecified';
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type SkillRequirement = 'required' | 'preferred' | 'not_interested';
export type SkillConfidence = 'low' | 'medium' | 'high';

export interface SimpleSkill {
  title: string;
  subcategory: string;
  level: SkillLevel;
  growth: string;
  salary: string;
  skillScore: number;
  confidence: SkillConfidence;
  category?: SkillCategory;
  weight?: SkillWeight;
  requirement?: SkillRequirement;
  businessCategory?: string;
}

export interface UnifiedSkill extends SimpleSkill {
  id: string;
  category: SkillCategory;
  weight: SkillWeight;
  businessCategory: string;
  benchmarks: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
}

export interface RoleSkillData {
  roleId: string;
  title: string;
  track: string;
  specialized: UnifiedSkill[];
  common: UnifiedSkill[];
  certifications: UnifiedSkill[];
  skills: UnifiedSkill[];
}