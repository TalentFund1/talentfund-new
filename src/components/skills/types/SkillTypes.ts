export interface Skill {
  title: string;
  subcategory: string;
  category: 'specialized' | 'common' | 'certification';
  type: 'critical' | 'technical' | 'necessary';
  level?: string;
  growth: string;
  salary: string;
  confidence: 'low' | 'medium' | 'high';
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

export type SkillType = 'critical' | 'technical' | 'necessary';
export type SkillCategory = 'specialized' | 'common' | 'certification';