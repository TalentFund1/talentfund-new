export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'unspecified';
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type SkillRequirement = 'required' | 'preferred' | 'not_interested';

export interface SimpleSkill {
  title: string;
  subcategory: string;
  level: SkillLevel;
  growth: string;
  salary: string;
  skillScore?: number;
  category?: SkillCategory;
  weight?: SkillWeight;
  requirement?: SkillRequirement;
}

export interface UnifiedSkill extends SimpleSkill {
  id: string;
  category: SkillCategory;
  weight: SkillWeight;
  businessCategory: string;
  skillScore: number;
}