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
    C: boolean;  // Company
    B2: boolean; // Benchmark
    O: boolean;  // Organization
  };
}

export interface UnifiedSkill extends Skill {
  requirement?: 'required' | 'preferred' | 'skill_goal' | 'not_interested';
}

export type SkillType = 'critical' | 'technical' | 'necessary';
export type SkillCategory = 'specialized' | 'common' | 'certification';

// Add this type for simpler skill display
export interface SimpleSkill {
  title: string;
  subcategory: string;
  level?: string;
  growth: string;
}