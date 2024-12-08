export interface Skill {
  title: string;
  subcategory: string;
  level?: string;
  growth: string;
  salary?: string;
}

export interface CertificationSkill extends Skill {
  salary: string;  // Make salary required for certifications
}

export interface UnifiedSkill {
  title: string;
  subcategory: string;
  category: 'specialized' | 'common' | 'certification';
  type: 'critical' | 'technical' | 'necessary';
  level?: string;
  growth: string;
  salary: string;
  confidence: 'low' | 'medium' | 'high';
  benchmarks: { [key: string]: boolean };
}

export interface SkillEntry extends UnifiedSkill {
  tracks?: {
    professional?: Record<string, any>;
    managerial?: Record<string, any>;
  };
}

export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillType = 'critical' | 'technical' | 'necessary';