// Basic skill-related types shared between roles and employees
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillWeight = 'critical' | 'technical' | 'necessary';

// Base skill interface shared between roles and employees
export interface BaseSkill {
  id: string;
  title: string;
  category: SkillCategory;
  subcategory: string;
  weight: SkillWeight;
  businessCategory: string;
}

// Skill benchmarking data
export interface SkillBenchmark {
  B: boolean;
  R: boolean;
  M: boolean;
  O: boolean;
}

// Skill metrics shared between roles and employees
export interface SkillMetrics {
  growth: string;
  salary: string;
  confidence: 'low' | 'medium' | 'high';
}

console.log('Shared skill types established for consistent typing across stores');