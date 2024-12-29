export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillRequirement = 'required' | 'preferred' | 'not_interested' | 'unknown' | 'skill_goal';

export interface DetailedSkill {
  name: string;
  level: string;
  isSkillGoal: boolean;
}

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
  skillScore?: number;
  benchmarks: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
}

export interface UnifiedSkill extends Skill {
  goalStatus?: SkillRequirement;
  roleLevel?: string;
  isCompanySkill?: boolean;
  skillScore?: number;
  minimumLevel?: string;
  requirementLevel?: 'required' | 'preferred' | 'optional';
  metrics?: {
    growth: string;
    salary: string;
    confidence: 'low' | 'medium' | 'high';
    skillScore: number;
  };
}
