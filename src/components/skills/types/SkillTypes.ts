export type SkillWeight = 'critical' | 'technical' | 'necessary';
export type SkillCategory = 'specialized' | 'common' | 'certification';
export type SkillRequirement = 'required' | 'preferred' | 'skill_goal' | 'not_interested' | 'unknown';

// Base skill interface with common properties
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
  benchmarks: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
}

// Base skill interface with common properties
export interface BaseSkill {
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
  benchmarks: {
    B: boolean;
    R: boolean;
    M: boolean;
    O: boolean;
  };
}

// Unified skill interface extending base skill with optional properties
export interface UnifiedSkill extends BaseSkill {
  requirement?: SkillRequirement;
  roleLevel?: string | null;
  isCompanySkill?: boolean;
}

// Employee skill interface for employee-specific skill data
export interface EmployeeSkill extends UnifiedSkill {
  requirement: SkillRequirement;
}

// Simple skill interface for basic skill display
export interface SimpleSkill {
  title: string;
  subcategory: string;
  level: string;
  growth: string;
  businessCategory?: string;
}

// Detailed skill interface for expanded skill information
export interface DetailedSkill {
  name: string;
  level: string;
  isSkillGoal: boolean;
}

// Role skill data interface for role-specific skill information
export interface RoleSkillData {
  title: string;
  specialized: UnifiedSkill[];
  common: UnifiedSkill[];
  certifications: UnifiedSkill[];
  skills: UnifiedSkill[];  // Added for CategorySection
  soc?: string;            // Added for SkillProfileHeader
  function?: string;       // Added for forms and header
  mappedTitle?: string;    // Added for forms and header
  occupation?: string;     // Added for forms and header
  description?: string;    // Added for forms and header
  roleTrack?: "Professional" | "Managerial"; // Added for role selection
}

// Mapped skill interface for skill matrix display
export interface MappedSkill extends UnifiedSkill {
  requirement: SkillRequirement;
  roleLevel: string | null;
  isCompanySkill: boolean;
}

console.log('SkillTypes loaded with all required interfaces and types');