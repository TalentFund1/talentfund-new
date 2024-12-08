export interface Skill {
  title: string;
  subcategory: string;
  level?: string;
  growth: string;
  salary: string;
  confidence: 'low' | 'medium' | 'high';
  category: 'specialized' | 'common' | 'certification';
  type: 'critical' | 'technical' | 'necessary';
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

export interface SkillEntry {
  title: string;
  category: 'specialized' | 'common' | 'certification';
  subcategory: string;
  type: 'critical' | 'technical' | 'necessary';
  growth: string;
  salary: string;
  confidence: 'low' | 'medium' | 'high';
  benchmarks: {
    B: boolean;
    C: boolean;
    B2: boolean;
    O: boolean;
  };
}

export type SkillType = 'critical' | 'technical' | 'necessary';
export type SkillCategory = 'specialized' | 'common' | 'certification';