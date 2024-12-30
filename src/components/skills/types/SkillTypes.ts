export type SkillId = string;
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type SkillConfidence = 'low' | 'medium' | 'high';

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
  confidence?: SkillConfidence;
  hasSkill?: boolean;
  benchmarks?: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
}