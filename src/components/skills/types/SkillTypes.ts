export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillRequirement = 'required' | 'preferred' | 'not_interested' | 'unknown' | 'skill_goal';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'unspecified';
export type SkillRequirementLevel = 'required' | 'preferred' | 'optional';

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
  level: SkillLevel;
  growth: string;
  salary: string;
  skillScore: number;
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
  minimumLevel: SkillLevel;
  requirementLevel: SkillRequirementLevel;
  metrics: {
    growth: string;
    salary: string;
    skillScore: number;
  };
}

export interface SimpleSkill {
  title: string;
  subcategory: string;
  businessCategory?: string;
  level: string;
  growth: string;
}