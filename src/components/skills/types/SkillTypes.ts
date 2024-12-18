export interface Skill {
  id: string;
  title: string;
  subcategory: string;
  category: 'specialized' | 'common' | 'certification';
  businessCategory: string;
  weight: 'critical' | 'technical' | 'necessary';
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

export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type SkillCategory = 'specialized' | 'common' | 'certification';

export interface SimpleSkill {
  title: string;
  subcategory: string;
  category?: string;
  businessCategory?: string;
  level: string;
  growth: string;
}