export interface Skill {
  id: string;
  title: string;
  subcategory: string;
  type: SkillType;
  weight: SkillWeight;
  level?: string;
  growth: string;
  salary: string;
  confidence: 'low' | 'medium' | 'high';
  occupation?: string;
  benchmarks: {
    B: boolean;  // Business
    R: boolean;  // Role
    M: boolean;  // Manager
    O: boolean;  // Organization
  };
}

export interface UnifiedSkill extends Skill {
  requirement?: 'required' | 'preferred' | 'skill_goal' | 'not_interested';
}

export interface SimpleSkill {
  title: string;
  subcategory: string;
  level?: string;
  growth: string;
}

export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type SkillType = 'specialized' | 'common' | 'certification';
export type SkillCategory = 'specialized' | 'common' | 'certification';