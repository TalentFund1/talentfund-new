export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type SkillCategory = 'specialized' | 'common' | 'certification';

export interface Skill {
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
}

export interface UnifiedSkill extends Skill {
  requirement?: 'required' | 'preferred' | 'skill_goal' | 'not_interested';
}

export interface RoleSkillData {
  title: string;
  specialized: UnifiedSkill[];
  common: UnifiedSkill[];
  certifications: UnifiedSkill[];
  soc?: string;
}

export interface SimpleSkill {
  title: string;
  subcategory: string;
  category?: string;
  businessCategory?: string;
  level: string;
  growth: string;
}