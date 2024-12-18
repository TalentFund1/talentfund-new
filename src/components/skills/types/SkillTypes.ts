export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';

export interface UnifiedSkill {
  id: string;
  title: string;
  category: SkillCategory;
  businessCategory: string;
  subcategory: string;
  weight: SkillWeight;
  level?: string;
  growth: string;
  salary: string;
  confidence: 'low' | 'medium' | 'high';
  benchmarks: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
}

export interface SimpleSkill {
  title: string;
  subcategory: string;
  level: string;
  growth: string;
  businessCategory?: string;
  category?: string;
}

export interface RoleSkillData {
  title: string;
  soc: string;
  specialized: UnifiedSkill[];
  common: UnifiedSkill[];
  certifications: UnifiedSkill[];
}

export interface Skill extends UnifiedSkill {}